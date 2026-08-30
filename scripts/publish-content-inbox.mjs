import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const API_VERSION = '2026-03-10'
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function issueSlug(body) {
  return body?.match(/^\s*<!--\s*blog-meta\s*\n[\s\S]*?^slug:\s*([a-z0-9]+(?:-[a-z0-9]+)*)\s*$[\s\S]*?^-->/mi)?.[1] || null
}

export function validateRequest(value) {
  if (!value || value.version !== 1) throw new Error('content request must use version 1')
  if (!SLUG_PATTERN.test(value.slug || '')) throw new Error('content request has an invalid slug')
  if (!['en', 'zh'].includes(value.locale)) throw new Error('content request has an invalid locale')
  if (typeof value.title !== 'string' || !value.title.trim() || value.title.length > 256) throw new Error('content request has an invalid title')
  if (typeof value.body !== 'string' || value.body.length < 100 || value.body.length > 60_000) throw new Error('content request has an invalid body')
  if (issueSlug(value.body) !== value.slug) throw new Error('content request body slug does not match its envelope')
  return {
    slug: value.slug,
    locale: value.locale,
    title: value.title.trim(),
    body: value.body,
    labels: ['blog', `lang:${value.locale}`],
  }
}

async function requestJson(fetchImpl, url, options) {
  const response = await fetchImpl(url, options)
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${JSON.stringify(data)}`)
  return data
}

async function listIssues(fetchImpl, repository, labels, headers) {
  const issues = []
  for (let page = 1; page <= 10; page += 1) {
    const query = new URLSearchParams({ state: 'all', labels: labels.join(','), per_page: '100', page: String(page) })
    const batch = await requestJson(fetchImpl, `https://api.github.com/repos/${repository}/issues?${query}`, { headers })
    issues.push(...batch.filter((issue) => !issue.pull_request))
    if (batch.length < 100) break
  }
  return issues
}

export async function upsertIssue(request, { fetchImpl = fetch, token, repository }) {
  if (!token) throw new Error('GITHUB_TOKEN is required')
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository || '')) throw new Error('GITHUB_REPOSITORY must be owner/repository')
  const payload = validateRequest(request)
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': API_VERSION,
    'Content-Type': 'application/json',
  }
  const issues = await listIssues(fetchImpl, repository, payload.labels, headers)
  const existing = issues.find((issue) => issueSlug(issue.body) === payload.slug)
  const url = existing
    ? `https://api.github.com/repos/${repository}/issues/${existing.number}`
    : `https://api.github.com/repos/${repository}/issues`
  return requestJson(fetchImpl, url, {
    method: existing ? 'PATCH' : 'POST',
    headers,
    body: JSON.stringify({ title: payload.title, body: payload.body, labels: payload.labels, state: 'open' }),
  })
}

async function requestFiles(root) {
  const files = []
  const visit = async (directory) => {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const target = path.join(directory, entry.name)
      if (entry.isDirectory()) await visit(target)
      else if (entry.isFile() && entry.name.endsWith('.json')) files.push(target)
    }
  }
  await visit(root)
  return files.sort()
}

export async function publishInbox(root, options) {
  const results = []
  for (const file of await requestFiles(root)) {
    const request = JSON.parse(await readFile(file, 'utf8'))
    const issue = await upsertIssue(request, options)
    results.push({ file: path.relative(root, file), number: issue.number, url: issue.html_url })
  }
  return results
}

async function main() {
  const root = process.argv[2] || '.content-inbox'
  const results = await publishInbox(root, {
    token: process.env.GITHUB_TOKEN,
    repository: process.env.GITHUB_REPOSITORY,
  })
  console.log(JSON.stringify({ published: results }, null, 2))
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error.message)
    process.exitCode = 1
  })
}
