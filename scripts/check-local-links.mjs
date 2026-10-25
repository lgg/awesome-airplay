#!/usr/bin/env node
import {existsSync, readFileSync} from 'node:fs';
import {dirname, isAbsolute, relative, resolve, sep} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const docs = ['README.md', 'COMPATIBILITY.md', 'CONTRIBUTING.md', '.github/PULL_REQUEST_TEMPLATE.md'];

// Check local Markdown links/images and HTML src/href attributes.
// External links are checked separately by curators; never make CI rely on
// third-party network availability.
function targets(content) {
  const result = [];
  for (const match of content.matchAll(/!?\[[^\]]*\]\(\s*(?:<([^>]+)>|([^\s)]+))/g))
    result.push(match[1] || match[2]);
  for (const match of content.matchAll(/\b(?:src|href)=["']([^"']+)["']/gi))
    result.push(match[1]);
  return result;
}

export function validateLocalLinks(files, projectRoot=root) {
  const issues = [];
  for (const file of files) {
    for (const target of targets(file.content)) {
      if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(target)) continue;
      const pathname = target.split(/[?#]/, 1)[0];
      if (!pathname) continue;
      let decoded;
      try {
        decoded = decodeURIComponent(pathname);
      } catch {
        issues.push('Invalid URL encoding in ' + file.path + ': ' + target);
        continue;
      }
      if (decoded.startsWith('/')) {
        issues.push('Absolute local link in ' + file.path + ': ' + target);
        continue;
      }
      const destination = resolve(projectRoot, dirname(file.path), decoded.replaceAll('\\', '/'));
      const inside = relative(projectRoot, destination);
      if (inside === '..' || inside.startsWith('..' + sep) || isAbsolute(inside)) {
        issues.push('Link escapes repository in ' + file.path + ': ' + target);
      } else if (!existsSync(destination)) {
        issues.push('Missing local target in ' + file.path + ': ' + target);
      }
    }
  }
  return issues;
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  const inputs = docs.map(path => ({path, content: readFileSync(resolve(root, path), 'utf8')}));
  const problems = validateLocalLinks(inputs);
  if (problems.length) {
    console.error('Local-link audit failed:\n- ' + problems.join('\n- '));
    process.exitCode = 1;
  } else {
    console.log('Local-link audit passed for README, compatibility, contribution and PR docs.');
  }
}
