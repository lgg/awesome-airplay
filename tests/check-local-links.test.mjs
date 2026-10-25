import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {validateLocalLinks} from '../scripts/check-local-links.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const markdown = (path, content) => [{path, content}];

test('all real repository docs have valid local file/image references', () => {
  const paths = ['README.md','COMPATIBILITY.md','CONTRIBUTING.md','.github/PULL_REQUEST_TEMPLATE.md'];
  const files = paths.map(path => ({
    path, content: readFileSync(new URL('../' + path, import.meta.url), 'utf8')
  }));
  assert.deepEqual(validateLocalLinks(files, root), []);
});

test('missing Markdown image is detected', () => {
  const issues = validateLocalLinks(markdown('README.md', '![Logo](docs/assets/missing-logo.png)'), root);
  assert.ok(issues.some(issue => issue.includes('Missing local target')));
});

test('missing Markdown cross-document link including anchor is detected', () => {
  const issues = validateLocalLinks(markdown('README.md', '[Broken](MISSING-COMPATIBILITY.md#part)'), root);
  assert.ok(issues.some(issue => issue.includes('Missing local target')));
});

test('HTML img src is checked', () => {
  const issues = validateLocalLinks(markdown('README.md', '<img src="docs/assets/no-logo.png" alt="Broken">'), root);
  assert.ok(issues.some(issue => issue.includes('Missing local target')));
});

test('relative links resolve from the document directory', () => {
  const ok = validateLocalLinks(markdown('.github/PULL_REQUEST_TEMPLATE.md', '[README](../README.md)'), root);
  assert.deepEqual(ok, []);
});

test('external URLs and same-page anchors are excluded from local checks', () => {
  const ok = validateLocalLinks(markdown('README.md', [
    '[upstream](https://github.com/avahi/avahi)',
    '[email](mailto:maintainer@example.org)',
    '[section](#contents)',
    '<img src="https://img.shields.io/badge/test-ok">'
  ].join('\n')), root);
  assert.deepEqual(ok, []);
});

test('path traversal outside the repo is rejected', () => {
  const issues = validateLocalLinks(markdown('README.md', '[unsafe](../../etc/passwd)'), root);
  assert.ok(issues.some(issue => issue.includes('Link escapes repository')));
});

test('malformed percent-encoding in local link is rejected', () => {
  const issues = validateLocalLinks(markdown('README.md', '[bad](docs/assets/%zz.png)'), root);
  assert.ok(issues.some(issue => issue.includes('Invalid URL encoding')));
});
