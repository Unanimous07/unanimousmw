#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import { resolve, relative, sep } from 'node:path';

const ASSETS_DIR = resolve(process.cwd(), 'src/assets');
const OUTPUT_FILE = resolve(ASSETS_DIR, 'portfolio-index.json');
const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg']);

function extnameLower(name){ const i = name.lastIndexOf('.'); return i>=0? name.substring(i).toLowerCase():''; }

async function walk(dir){
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const folders = [];
  const files = [];
  for (const e of entries){
    if (e.name.startsWith('.')) continue;
    const abs = resolve(dir, e.name);
    if (e.isDirectory()) {
      const node = await buildNode(abs);
      if (node) folders.push(node);
    } else if (e.isFile()) {
      const ext = extnameLower(e.name);
      if (!IMAGE_EXTS.has(ext)) continue;
      const rel = relative(ASSETS_DIR, abs).split(sep).join('/');
      files.push({ type:'file', name: e.name, path: rel, url: `/assets/${rel}` });
    }
  }
  folders.sort((a,b)=> a.name.localeCompare(b.name));
  files.sort((a,b)=> a.name.localeCompare(b.name));
  return { folders, files };
}

async function findCover(node){
  // Prefer an image in this folder, else first child folder's cover
  if (node.children) {
    for (const c of node.children) if (c.type==='file') return c.url;
    for (const c of node.children) if (c.type==='folder' && c.coverUrl) return c.coverUrl;
  }
  return null;
}

async function buildNode(abs){
  const name = abs.split(sep).pop();
  const { folders, files } = await walk(abs);
  const rel = relative(ASSETS_DIR, abs).split(sep).join('/');
  const children = [...folders, ...files];
  const node = { type:'folder', name, path: rel, children };
  const coverUrl = await findCover(node);
  if (coverUrl) node.coverUrl = coverUrl;
  return node;
}

async function build(){
  const rootChildren = (await walk(ASSETS_DIR));
  const root = {
    type:'folder',
    name:'Home',
    path:'',
    children: [...rootChildren.folders, ...rootChildren.files]
  };
  const json = JSON.stringify(root, null, 2);
  await fs.writeFile(OUTPUT_FILE, json, 'utf8');
  console.log(`Wrote manifest: ${OUTPUT_FILE}`);
}

build().catch(err=>{ console.error(err); process.exit(1); });
