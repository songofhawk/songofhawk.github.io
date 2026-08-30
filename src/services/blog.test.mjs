import assert from 'node:assert/strict'
import test from 'node:test'
import { isTrustedBlogIssue } from './blog.js'

test('trusts owner and repository automation issues but rejects other authors and pull requests', () => {
  assert.equal(isTrustedBlogIssue({ user: { login: 'songofhawk' } }), true)
  assert.equal(isTrustedBlogIssue({ user: { login: 'github-actions[bot]' } }), true)
  assert.equal(isTrustedBlogIssue({ user: { login: 'outsider' } }), false)
  assert.equal(isTrustedBlogIssue({ user: { login: 'songofhawk' }, pull_request: {} }), false)
})
