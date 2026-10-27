// Parse the supplied document as inert HTML. JSDOM does not execute its scripts.
const { JSDOM } = require('jsdom');
const fs = require('node:fs');
const crypto = require('node:crypto');
const source = 'docs/sources/constitution-chapter1.html';
const doc = new JSDOM(fs.readFileSync(source, 'utf8')).window.document;
const ids = new Set();
function convert(element, path = '') {
  const details = element.querySelector(':scope > details');
  const summary = details.querySelector(':scope > summary');
  const title = summary.querySelector('.tt').textContent.trim();
  const key = `${path}/${title}`;
  const id = `constitution-${crypto.createHash('sha256').update(key).digest('hex').slice(0, 16)}`;
  if (ids.has(id)) throw new Error(`Duplicate source node: ${title}`);
  ids.add(id);
  const annotations = [...summary.children].filter(e => !e.classList.contains('tt')).map(e => e.textContent.trim()).filter(Boolean);
  const children = [...details.querySelectorAll(':scope > .children > .node')].map(e => convert(e, key));
  return { id, title, content: title, ...(annotations.length ? { annotations } : {}), ...(children.length ? { children } : {}) };
}
const root = convert(doc.querySelector('section.tree > .node'));
if (ids.size !== doc.querySelectorAll('.node').length) throw new Error('Some nodes were not imported');
const result = { id: 'law-constitution', title: '宪法', content: [doc.querySelector('header p').textContent, doc.querySelector('footer').textContent].join('\n\n'), source: '用户整理：宪法学第一至四节详细交互知识树（主客观考频）', children: [root] };
fs.writeFileSync('src/data/constitution.json', JSON.stringify(result, null, 2) + '\n');
console.log(`Imported ${ids.size} source nodes and ${root.children.length} sections.`);
