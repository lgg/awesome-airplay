#!/usr/bin/env node
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';

// README section -> COMPATIBILITY subsection. Deliberately explicit: new sections
// must be registered here rather than silently escaping validation.
const groupMap = new Map([
  ['Audio Receivers','Audio receivers'],
  ['Screen Mirroring Receivers','Screen mirroring receivers'],
  ['Senders and Desktop Clients','Senders and desktop clients'],
  ['Android','Android apps'],
  ['Related Streaming Technologies','Related, non-AirPlay streaming'],
  ['Bridges and Multiroom','Bridges and relays'],
  ['Commercial Receivers','Commercial receivers'],
  ['Hardware and DIY','Hardware and DIY'],
  ['Linux Audio Stack','Linux audio integration'],
  ['Libraries and Protocol Implementations','Libraries and protocol implementations'],
  ['Historical Projects','Historical implementations']
]);
const referenceGroups = new Set(['Debugging and Discovery','Security Research','Protocol Notes','Related Awesome Lists']);
const inverseGroups = new Map([...groupMap].map(([a,b])=>[b,a]));
const prices = new Set(['Free','Freemium','Paid']);
const protocols = new Set(['AirPlay 1','AirPlay 2','AirPlay 2 (Legacy)','RAOP','Custom Protocol']);
const allowed = new Set(['Open Source',...prices,...protocols]);
const flags = new Set(['✓','◐','?','—']);
const streamHeader = '| Project | Platform | Protocol / mode | Audio | Mirroring | Video | Multiroom | Notes |';
const streamDivider = '| --- | --- | --- | :---: | :---: | :---: | :---: | --- |';
const referenceHeader = '| Resource | README section | Why it is here |';
const referenceDivider = '| --- | --- | --- |';
// Reviewed inventory snapshot: intentional additions/removals/renames update this file too.
const reviewedCatalog = JSON.parse(readFileSync(new URL('../tests/catalog-baseline.json', import.meta.url), 'utf8'));
const entryRE = /^- \[([^\]]+)\]\((https?:\/\/[^)]+)\) - (.+)$/;
const linkRE = /^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/;

export function validate(readme, matrix) {
  const issues = [];
  // TOC anchors are user-facing navigation; confirm every section is linked
  // in the correct order, not merely that its resources appear in the index.
  const headings=[...readme.matchAll(/^## (.+)$/gm)].map(match=>match[1]);
  const knownReadmeHeadings=new Set(['Contents','Resource Labels',...groupMap.keys(),...referenceGroups]);
  const seenReadmeHeadings=new Set();
  for(const name of headings){
    if(seenReadmeHeadings.has(name)) issues.push('Duplicate README section heading: '+name);
    if(!knownReadmeHeadings.has(name)) issues.push('Unregistered README section heading: '+name);
    seenReadmeHeadings.add(name);
  }
  for(const name of knownReadmeHeadings)
    if(!seenReadmeHeadings.has(name)) issues.push('Missing README section heading: '+name);
  const tocBlock=readme.split(/^## Contents\s*$/m)[1]?.split(/^## /m)[0];
  if (!tocBlock) issues.push('Missing README contents section');
  else {
    const listed=tocBlock.split(/\r?\n/).filter(line=>line.startsWith('- ['));
    const expected=headings.filter(name=>name!=='Contents')
      .map(name=>'- ['+name+'](#'+name.toLowerCase().replace(/[^a-z0-9 -]/g,'').trim().replace(/\s+/g,'-')+')');
    if (listed.length!==expected.length) issues.push('README contents length mismatch');
    for (let i=0;i<expected.length;i++) if(listed[i]!==expected[i])
      issues.push('README contents heading or anchor mismatch: '+headings.filter(name=>name!=='Contents')[i]);
  }
  let section = null;
  const source = new Map();
  const sourceUrls = new Map();
  for (const [index,line] of readme.split(/\r?\n/).entries()) {
    const h = /^## (.+)$/.exec(line);
    if (h) section = h[1];
    if (/^[*+] \[[^\]]+\]\(https?:\/\//.test(line)) {
      issues.push('Unsupported README list marker at line '+(index+1));
      continue;
    }
    if (!line.startsWith('- ')) continue;
    const isKnownSection=groupMap.has(section) || referenceGroups.has(section);
    // Any external Markdown list link is a catalog resource, even under a new heading.
    // Do not let an unregistered category silently hide its entries from validation.
    if (!isKnownSection && !/^- \[[^\]]+\]\(https?:\/\//.test(line)) continue;
    if (!isKnownSection) issues.push('Unknown README resource section: '+section);
    const m = entryRE.exec(line);
    if (!m) { issues.push('Malformed README item at line '+(index+1)); continue; }
    const [,name,url,body] = m;
    if (!url.startsWith('https://')) issues.push('Non-HTTPS README URL: '+name);
    if (source.has(name)) issues.push('Duplicate README entry: '+name);
    if (sourceUrls.has(url)) issues.push('Duplicate README URL: '+url);
    sourceUrls.set(url,name);
    source.set(name,{url,section,protocol: [...body.split(' — ')[0].matchAll(/\x60([^\x60]+)\x60/g)].map(x=>x[1]).find(x=>protocols.has(x))});
    if (section==='Related Awesome Lists') {
      if (/\x60[^\x60]+\x60/.test(body)) issues.push('Badges on related awesome list: '+name);
      if (!body.trim().endsWith('.')) issues.push('Missing related-list description period: '+name);
      continue;
    }
    const parts=body.split(' — ');
    if (parts.length!==2 || !parts[1].trim()) { issues.push('Missing README description: '+name); continue; }
    if (!parts[1].trim().endsWith('.')) issues.push('Missing final period: '+name);
    const tags=[...parts[0].matchAll(/\x60([^\x60]+)\x60/g)].map(x=>x[1]);
    if (tags.length>3) issues.push('Too many badges: '+name);
    if (tags.some(x=>!allowed.has(x))) issues.push('Unknown badge: '+name);
    if (tags.filter(x=>prices.has(x)).length!==1) issues.push('Pricing badge invalid: '+name);
    if (tags.filter(x=>x==='Open Source').length>1) issues.push('Duplicate license badge: '+name);
    if (tags.filter(x=>protocols.has(x)).length>1) issues.push('Multiple protocol badges: '+name);
    if (tags.some(x=>protocols.has(x))!==parts[0].includes(' · ')) issues.push('Protocol separator: '+name);
    // Tags must occupy the entire prefix; no forgotten badges, prefixes or stray text.
    const canonical=(tags.includes('Open Source')?'`Open Source` ':'')+
      (tags.find(x=>prices.has(x))?'`'+tags.find(x=>prices.has(x))+'`':'')+
      (tags.find(x=>protocols.has(x))?' · `'+tags.find(x=>protocols.has(x))+'`':'');
    if (parts[0]!==canonical) issues.push('Malformed or misordered badges: '+name);
  }
  if (source.size===0) issues.push('README parsed no resources');
  const target = new Map();
  let subSection = null, reference = false;
  const knownMatrixHeadings=new Set(['How to read the matrix','Streaming software, hardware and implementations','Discovery, research, and other references','Maintenance']);
  const seenMatrixHeadings=new Set();
  const seenMatrixSubsections=new Set();
  // A link row is only part of a rendered Markdown table while continuously
  // following its header and separator. Blank lines terminate tables.
  let tableState='outside';
  for (const [index,line] of matrix.split(/\r?\n/).entries()) {
    const h2=/^## (.+)$/.exec(line);
    if (h2) {
      const name=h2[1];
      if(!knownMatrixHeadings.has(name)) issues.push('Unknown matrix section heading: '+name);
      if(seenMatrixHeadings.has(name)) issues.push('Duplicate matrix section heading: '+name);
      seenMatrixHeadings.add(name);
      reference=name==='Discovery, research, and other references';
      subSection=null;
      tableState='outside';
    }
    const h3=/^### (.+)$/.exec(line);
    if (h3) {
      subSection=h3[1];
      if(!inverseGroups.has(subSection)) issues.push('Unknown matrix subsection heading: '+subSection);
      if(seenMatrixSubsections.has(subSection)) issues.push('Duplicate matrix subsection heading: '+subSection);
      seenMatrixSubsections.add(subSection);
      tableState='outside';
    }
    if (line.startsWith('| Project |') || line.startsWith('| Resource |')) {
      if (tableState==='awaiting-separator') issues.push('Missing matrix table separator at line '+(index+1));
      if (line !== (reference ? referenceHeader : streamHeader))
        issues.push('Matrix table header mismatch at line '+(index+1));
      tableState='awaiting-separator';
      continue;
    }
    if (tableState==='awaiting-separator') {
      if (/^\|(?:\s*:?-{3,}:?\s*\|){3,}$/.test(line)) {
        if (line !== (reference ? referenceDivider : streamDivider))
          issues.push('Matrix table divider mismatch at line '+(index+1));
        tableState='rows';
        continue;
      }
      issues.push('Missing matrix table separator at line '+(index+1));
      tableState='outside';
    }
    if (line.startsWith('| [') && tableState!=='rows')
      issues.push('Orphan matrix resource row at line '+(index+1));
    if (!line.startsWith('| [') && tableState==='rows') tableState='outside';
    if (!line.startsWith('| [') && /^\|.*\]\(https?:\/\//.test(line)) {
      issues.push('Malformed matrix link row at line '+(index+1));
      continue;
    }
    if (!line.startsWith('| [')) continue;
    const cells=line.split(/(?<!\\)\|/).slice(1,-1).map(x=>x.trim());
    const m=linkRE.exec(cells[0]||'');
    if (!m) { issues.push('Malformed matrix item at line '+(index+1)); continue; }
    const [,name,url]=m;
    if (!url.startsWith('https://')) issues.push('Non-HTTPS matrix URL: '+name);
    if (target.has(name)) issues.push('Duplicate matrix entry: '+name);
    const group=reference?cells[1]:inverseGroups.get(subSection);
    target.set(name,{url,section:group,mode:reference?null:cells[2]});
    if (reference) {
      if(cells.length!==3) issues.push('Reference columns invalid: '+name);
      if(!referenceGroups.has(cells[1])) issues.push('Reference group invalid: '+name);
    } else {
      if(!inverseGroups.has(subSection)) issues.push('Unknown matrix subsection: '+name);
      if(cells.length!==8) issues.push('Streaming columns invalid: '+name);
      if(cells.length===8) {
        for(const value of cells.slice(3,7)) if(!flags.has(value)) issues.push('Invalid feature flag: '+name);
        if(!cells[1]||!cells[2]||!cells[7]) issues.push('Missing matrix metadata: '+name);
      }
    }
  }
  for(const name of knownMatrixHeadings)
    if(!seenMatrixHeadings.has(name)) issues.push('Missing matrix section heading: '+name);
  for(const name of inverseGroups.keys())
    if(!seenMatrixSubsections.has(name)) issues.push('Missing matrix subsection heading: '+name);
  if (target.size===0) issues.push('Matrix parsed no resources');
  for(const [name,v] of source) {
    const match=target.get(name);
    if(!match) issues.push('Missing matrix resource: '+name);
    else {
      if(match.url!==v.url) issues.push('URL mismatch: '+name);
      if(match.section!==v.section) issues.push('Section mismatch: '+name);
      if(v.protocol) {
        const mode=match.mode||'';
        const deniesAirPlay2=/(?:\b(?:no|without|unsupported|unverified)\s+AirPlay\s*2\b|\bAirPlay\s*2\s+(?:unsupported|not supported|unverified)\b)/i.test(mode);
        const deniesRAOP=/(?:\b(?:no|without|unsupported|unverified)\s+RAOP\b|\bRAOP\s+(?:unsupported|not supported|unverified)\b)/i.test(mode);
        const supportsAirPlay2=/AirPlay\s*(?:2|1\s*(?:\/|or)\s*2)/i.test(mode) && !deniesAirPlay2;
        const supportsAirPlay1=(/AirPlay\s*1/i.test(mode)||/RAOP|AirTunes/i.test(mode)) && !deniesRAOP;
        if(v.protocol==='AirPlay 2' && !supportsAirPlay2) issues.push('Protocol mismatch: '+name);
        if(v.protocol==='AirPlay 2 (Legacy)' && !supportsAirPlay2) issues.push('Protocol mismatch: '+name);
        if(v.protocol==='AirPlay 1' && !supportsAirPlay1) issues.push('Protocol mismatch: '+name);
        if(v.protocol==='RAOP' && (!/RAOP/i.test(mode)||deniesRAOP)) issues.push('Protocol mismatch: '+name);
        if(v.protocol==='Custom Protocol' && !/not AirPlay|AriaCast|custom protocol/i.test(mode)) issues.push('Protocol mismatch: '+name);
      }
    }
  }
  for(const name of target.keys()) if(!source.has(name)) issues.push('Extra matrix resource: '+name);
  // README and COMPATIBILITY.md may be edited together, concealing an accidental
  // deletion or renaming. Independently track reviewed items in a committed baseline.
  const approved = new Map();
  for(const entry of reviewedCatalog) {
    if(approved.has(entry.name)) issues.push('Duplicate catalog baseline entry: '+entry.name);
    approved.set(entry.name,entry);
    const match=source.get(entry.name);
    if(!match) issues.push('Missing baseline resource: '+entry.name);
    else {
      if(match.url!==entry.url) issues.push('Baseline URL mismatch: '+entry.name);
      if(match.section!==entry.section) issues.push('Baseline section mismatch: '+entry.name);
    }
  }
  for(const name of source.keys()) if(!approved.has(name)) issues.push('Unreviewed catalog resource: '+name);
  return issues;
}
if(process.argv[1] && pathToFileURL(process.argv[1]).href===import.meta.url) {
  const readme=readFileSync(new URL('../README.md',import.meta.url),'utf8');
  const matrix=readFileSync(new URL('../COMPATIBILITY.md',import.meta.url),'utf8');
  const issues=validate(readme,matrix);
  if(issues.length) { console.error('Compatibility audit failed:\n- '+issues.join('\n- ')); process.exitCode=1; }
  else console.log('Compatibility audit passed: names, URLs, categories, table cells, feature flags and compact labels.');
}
