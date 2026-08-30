import assert from 'node:assert/strict'
import test from 'node:test'
import { upsertIssue, validateRequest } from './publish-content-inbox.mjs'

const request = {
  version: 1,
  slug: 'agent-safe-documents',
  locale: 'en',
  title: 'Agent-safe documents',
  body: `<!-- blog-meta\nslug: agent-safe-documents\n-->\n\n${'A useful article body. '.repeat(8)}`,
}

test('validates the versioned inbox envelope', () => {
  assert.deepEqual(validateRequest(request).labels, ['blog', 'lang:en'])
  assert.throws(() => validateRequest({ ...request, locale: 'fr' }), /locale/)
  assert.throws(() => validateRequest({ ...request, slug: 'different-slug' }), /does not match/)
})

test('updates an existing issue with the same locale and slug', async () => {
  const calls = []
  const fetchImpl = async (url, options) => {
    calls.push({ url: String(url), options })
    if (!options.method) return { ok: true, async json() { return [{ number: 3, body: request.body }] } }
    return { ok: true, async json() { return { number: 3, html_url: 'https://github.com/example/blog/issues/3' } } }
  }
  const result = await upsertIssue(request, { fetchImpl, token: 'secret', repository: 'example/blog' })
  assert.equal(result.number, 3)
  assert.equal(calls[1].options.method, 'PATCH')
  assert.equal(JSON.stringify(result).includes('secret'), false)
})

test('creates an issue when the slug is new', async () => {
  const calls = []
  const fetchImpl = async (url, options) => {
    calls.push({ url: String(url), options })
    if (!options.method) return { ok: true, async json() { return [] } }
    return { ok: true, async json() { return { number: 4 } } }
  }
  await upsertIssue(request, { fetchImpl, token: 'secret', repository: 'example/blog' })
  assert.equal(calls[1].options.method, 'POST')
})
