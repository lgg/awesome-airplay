#!/usr/bin/env node
// Check that all README resources appear exactly once in COMPATIBILITY.md.
import { readFileSync } from 'node:fs';
const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
const matrix = readFileSync(new URL('../COMPATIBILITY.md', import.meta.url), 'utf8');
const readmeRows = [...readme.matchAll(/^- \[([^\]]+)\]\((https?:\/\/[^)]+)\) - (.+)$/gm)];
const matrixRows = [...matrix.matchAll(/^\| \[([^\]]+)\]\((https?:\/\/[^)]+)\) \|/gm)];
const errors = [];
function index(rows, source) {
  const map = new Map();
  for (const [, name, url] of rows) {
    if (map.has(name)) errors.push(source + ': duplicate entry ' + name);
    map.set(name, url);
  }
  return map;
}
const a = index(readmeRows, 'README');
const b = index(matrixRows, 'COMPATIBILITY');
for (const [name, url] of a) {
  if (!b.has(name)) errors.push('Missing from matrix: ' + name);
  else if (b.get(name) !== url) errors.push('URL mismatch: ' + name);
}
for (const name of b.keys()) if (!a.has(name)) errors.push('Extra matrix resource: ' + name);
const protocols = new Set(['AirPlay 1', 'AirPlay 2', 'AirPlay 2 (Legacy)', 'RAOP', 'Custom Protocol']);
const prices = new Set(['Free', 'Freemium', 'Paid']);
const allowed = new Set(['Open Source', ...prices, ...protocols]);
for (const [, name, , rest] of readmeRows) {
  const labels = [...rest.split(' — ')[0].matchAll(/\x60([^\x60]+)\x60/g)].map(m => m[1]);
  if (labels.length > 3) errors.push(name + ': more than 3 README labels');
  if (labels.filter(v => protocols.has(v)).length > 1) errors.push(name + ': multiple protocol labels');
  if (labels.filter(v => prices.has(v)).length !== 1 && labels.length) errors.push(name + ': invalid pricing labels');
  if (labels.some(v => !allowed.has(v))) errors.push(name + ': unsupported label');
  if (labels.length && !rest.includes(' — ')) errors.push(name + ': missing description separator');
}
if (!readmeRows.length || !matrixRows.length) errors.push('Parser returned zero resources');
if (errors.length) {
  console.error('Compatibility validation failed:\n- ' + errors.join('\n- '));
  process.exitCode = 1;
} else console.log('Compatibility OK: ' + a.size + ' README entries indexed exactly once.');
