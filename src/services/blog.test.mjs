import assert from 'node:assert/strict'
import test from 'node:test'
import { blogIssueSearchParams, isTrustedBlogIssue } from './blog.js'

test('trusts owner and repository automation issues but rejects other authors and pull requests', () => {
  assert.equal(isTrustedBlogIssue({ user: { login: 'songofhawk' } }), true)
  assert.equal(isTrustedBlogIssue({ user: { login: 'github-actions[bot]' } }), true)
  assert.equal(isTrustedBlogIssue({ user: { login: 'outsider' } }), false)
  assert.equal(isTrustedBlogIssue({ user: { login: 'songofhawk' }, pull_request: {} }), false)
})

test('does not pre-filter the API query to the owner because automation uses a bot author', () => {
  const params = blogIssueSearchParams('en')
  assert.equal(params.get('labels'), 'blog,lang:en')
  assert.equal(params.has('creator'), false)
})
