import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validate} from '../scripts/check-compatibility.mjs';

const readme=readFileSync(new URL('../README.md',import.meta.url),'utf8');
const matrix=readFileSync(new URL('../COMPATIBILITY.md',import.meta.url),'utf8');
const line=readme.split('\n').find(x=>x.startsWith('- [Shairport Sync]'));
const row=matrix.split('\n').find(x=>x.startsWith('| [Shairport Sync]'));
const ref=matrix.split('\n').find(x=>x.startsWith('| [Avahi]'));
assert.ok(line && row && ref);

function fails(a,b,pattern) {
  const messages=validate(a,b);
  assert.ok(messages.some(x=>x.includes(pattern)),messages.join('\n'));
}
test('current catalog validates with nonempty entries',()=>{
  assert.deepEqual(validate(readme,matrix),[]);
  assert.ok((readme.match(/^- \[[^\]]+\]\(https?:\/\/[^)]+\) - /gm)||[]).length > 0);
});
test('omitted project detected',()=>fails(readme,matrix.replace(row+'\n',''),'Missing matrix resource'));
test('duplicate project detected',()=>fails(readme,matrix.replace(row,row+'\n'+row),'Duplicate matrix'));
test('extra project detected',()=>fails(readme,matrix.replace(row,row.replace('[Shairport Sync]','[Ghost]')+'\n'+row),'Extra matrix'));
test('changed URL detected',()=>fails(readme,matrix.replace(row,row.replace('mikebrady/shairport-sync','someone/other')),'URL mismatch'));
test('wrong category detected',()=>fails(readme,matrix.replace('### Audio receivers','### Senders and desktop clients'),'Section mismatch'));
test('unknown category detected',()=>fails(readme,matrix.replace('### Audio receivers','### Invalid heading'),'Unknown matrix subsection'));
test('bad feature symbol detected',()=>fails(readme,matrix.replace(row,row.replace('| ✓ |','| YES |')),'Invalid feature flag'));
test('wrong number of cells detected',()=>fails(readme,matrix.replace(row,row.replace('| ✓ | — |','| ✓ |')),'Streaming columns invalid'));
test('missing price badge detected',()=>fails(readme.replace(line,line.replace('\x60Free\x60','')),matrix,'Pricing badge invalid'));
test('unknown feature badge detected',()=>fails(readme.replace(line,line.replace('\x60Free\x60','\x60Audio\x60')),matrix,'Unknown badge'));
test('excessive badges detected',()=>fails(readme.replace(line,line.replace('\x60Free\x60','\x60Free\x60 \x60Video\x60')),matrix,'Too many badges'));
test('missing protocol separator detected',()=>fails(readme.replace(line,line.replace(' · \x60AirPlay 2\x60',' \x60AirPlay 2\x60')),matrix,'Protocol separator'));
test('malformed README entry detected',()=>fails(readme.replace(line,line.replace('[Shairport Sync]','[Shairport Sync')),matrix,'Malformed README'));
test('duplicate README project detected',()=>fails(readme.replace(line,line+'\n'+line),matrix,'Duplicate README'));
test('unknown reference category detected',()=>fails(readme,matrix.replace(ref,ref.replace('Debugging and Discovery','Somewhere else')),'Reference group invalid'));

test('mismatched AirPlay 2 protocol label is rejected',()=>{
  fails(readme,matrix.replace(row,row.replace('AirPlay 1 or 2 (build-dependent)','AirPlay 1 only')),'Protocol mismatch');
});
test('source protocol tag must agree with matrix',()=>{
  fails(readme.replace(line,line.replace('`AirPlay 2`','`RAOP`')),matrix,'Protocol mismatch');
});
test('the catalog keeps the two Android senders',()=>{
  for(const repo of ['https://github.com/g8row/centuryplay','https://github.com/MarcPelberg/android2apple4music']) {
    assert.ok(readme.includes(repo),'README missing '+repo);
    assert.ok(matrix.includes(repo),'COMPATIBILITY missing '+repo);
  }
});

test('unknown README section cannot silently hide new resources',()=>{
  const added=readme.replace('## Android\n','## Android\n\n## Newly Added Streaming Apps\n');
  fails(added,matrix,'Unknown README resource section');
});
test('duplicate URL under a different name is reported',()=>{
  fails(readme.replace(line,line+'\n'+line.replace('[Shairport Sync]','[Shairport Mirror]')),matrix,'Duplicate README URL');
});
test('misordered README badges are rejected',()=>{
  fails(readme.replace(line,line.replace('`Open Source` `Free`','`Free` `Open Source`')),matrix,'Malformed or misordered badges');
});
test('extra text next to badges is rejected',()=>{
  fails(readme.replace(line,line.replace('`Free`','`Free` accidentally')),matrix,'Malformed or misordered badges');
});
test('reference list requires a description period',()=>{
  const listing=readme.split('\n').find(x=>x.startsWith('- [Awesome Home Assistant]'));
  assert.ok(listing);
  fails(readme.replace(listing,listing.slice(0,-1)),matrix,'Missing related-list description period');
});
test('malformed matrix link row fails even if original still exists',()=>{
  const broken=row.replace('| [Shairport Sync]','|[Another Alias]');
  fails(readme,matrix.replace(row,row+'\n'+broken),'Malformed matrix link row');
});
