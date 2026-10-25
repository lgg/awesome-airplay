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

test('non-HTTPS resource URLs fail even if both files agree',()=>{
  const altered=readme.replace('https://github.com/mikebrady/shairport-sync','http://github.com/mikebrady/shairport-sync');
  const mirrored=matrix.replace('https://github.com/mikebrady/shairport-sync','http://github.com/mikebrady/shairport-sync');
  fails(altered,mirrored,'Non-HTTPS README URL');
  fails(altered,mirrored,'Non-HTTPS matrix URL');
});
test('non-HTTPS reference links fail',()=>{
  const refLine=readme.split('\n').find(x=>x.startsWith('- [Discovery for iPhone]'));
  assert.ok(refLine);
  fails(readme.replace(refLine,refLine.replace('https://','http://')),matrix,'Non-HTTPS README URL');
});
test('both Discovery App Store IDs are kept distinct',()=>{
  const mac='https://apps.apple.com/us/app/discovery-dns-sd-browser/id1381004916';
  const iphone='https://apps.apple.com/us/app/discovery-dns-sd-browser/id305441017';
  for(const url of [mac,iphone]){
    assert.ok(readme.includes(url),'README missing '+url);
    assert.ok(matrix.includes(url),'COMPATIBILITY missing '+url);
  }
});


test('baseline locks all 63 current resources independently from the matrix',()=>{
  const baseline=JSON.parse(readFileSync(new URL('./catalog-baseline.json',import.meta.url),'utf8'));
  assert.equal(baseline.length,63);
  const urls=new Set(baseline.map(x=>x.url));
  const names=new Set(baseline.map(x=>x.name));
  assert.equal(urls.size,63);
  assert.equal(names.size,63);
  assert.ok(names.has('centuryplay'));
  assert.ok(names.has('Android2Apple4Music'));
});
test('synchronized deletion from README and matrix cannot bypass baseline',()=>{
  const changedReadme=readme.replace(line+'\n','');
  const changedMatrix=matrix.replace(row+'\n','');
  fails(changedReadme,changedMatrix,'Missing baseline resource: Shairport Sync');
});
test('synchronized resource rename cannot bypass baseline',()=>{
  const changedReadme=readme.replace(line,line.replace('[Shairport Sync]','[Shairport Legacy Rename]'));
  const changedMatrix=matrix.replace(row,row.replace('[Shairport Sync]','[Shairport Legacy Rename]'));
  fails(changedReadme,changedMatrix,'Missing baseline resource: Shairport Sync');
  fails(changedReadme,changedMatrix,'Unreviewed catalog resource: Shairport Legacy Rename');
});
test('changed URL in both documents cannot bypass baseline',()=>{
  const changedReadme=readme.replace('https://github.com/mikebrady/shairport-sync','https://github.com/mikebrady/shairport-sync-new');
  const changedMatrix=matrix.replace('https://github.com/mikebrady/shairport-sync','https://github.com/mikebrady/shairport-sync-new');
  fails(changedReadme,changedMatrix,'Baseline URL mismatch: Shairport Sync');
});
test('misclassified resource in both documents cannot bypass baseline',()=>{
  const readmeWrong=readme.replace(line+'\n','').replace('## Screen Mirroring Receivers\n','## Screen Mirroring Receivers\n\n'+line+'\n');
  const matrixWrong=matrix.replace(row+'\n','').replace('### Screen mirroring receivers\n','### Screen mirroring receivers\n\n'+row+'\n');
  fails(readmeWrong,matrixWrong,'Baseline section mismatch: Shairport Sync');
});

test('matrix rejects rows separated from their Markdown table by a blank line',()=>{
  const century=matrix.split('\n').find(x=>x.startsWith('| [centuryplay]'));
  assert.ok(century);
  fails(readme,matrix.replace(century,'\n'+century),'Orphan matrix resource row');
});
test('matrix rejects table rows without their header separator',()=>{
  const separator='| --- | --- | --- | :---: | :---: | :---: | :---: | --- |';
  const header='| Project | Platform | Protocol / mode | Audio | Mirroring | Video | Multiroom | Notes |';
  const section=matrix.indexOf('### Android apps');
  assert.ok(section>=0);
  const before=matrix.slice(0,section),after=matrix.slice(section);
  const altered=after.replace(header+'\n'+separator+'\n',header+'\n');
  assert.notEqual(altered,after);
  fails(readme,before+altered,'Missing matrix table separator');
  fails(readme,before+altered,'Orphan matrix resource row');
});
test('matrix rejects table rows missing their header',()=>{
  const header='| Project | Platform | Protocol / mode | Audio | Mirroring | Video | Multiroom | Notes |';
  const separator='| --- | --- | --- | :---: | :---: | :---: | :---: | --- |';
  const section=matrix.indexOf('### Android apps');
  const after=matrix.slice(section);
  const altered=after.replace(header+'\n'+separator+'\n','');
  assert.notEqual(altered,after);
  fails(readme,matrix.slice(0,section)+altered,'Orphan matrix resource row');
});
test('centuryplay remains in the same uninterrupted Android matrix table',()=>{
  const android=matrix.split('### Android apps\n')[1]?.split('\n### ')[0];
  assert.ok(android);
  assert.match(android,/\| \[AirPlay Receiver for Android\][^\n]*\n\| \[centuryplay\]/);
  assert.deepEqual(validate(readme,matrix),[]);
});
