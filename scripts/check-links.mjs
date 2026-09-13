import {readdir,readFile,stat} from "node:fs/promises";import path from "node:path";
const root=process.cwd(),errors=[];const pages=[];
async function walk(dir){for(const n of await readdir(dir)){if([".git","node_modules","tmp","template"].includes(n))continue;const p=path.join(dir,n),s=await stat(p);if(s.isDirectory())await walk(p);else if(p.endsWith(".html"))pages.push(p)}}
await walk(root);
for(const page of pages){const html=await readFile(page,"utf8");if(!/^<!doctype html>/i.test(html))errors.push(`${page}: doctype absent`);if(!html.includes('name="viewport"'))errors.push(`${page}: viewport absent`);const links=[...html.matchAll(/(?:href|src)="([^"#]+)"/g)].map(m=>m[1]).filter(x=>!x.startsWith("http")&&!x.startsWith("mailto:")&&!x.startsWith("data:"));for(const link of links){const target=path.resolve(path.dirname(page),link);let ok=false;try{const s=await stat(target);ok=s.isDirectory()?await stat(path.join(target,"index.html")).then(()=>true).catch(()=>false):true}catch{}if(!ok)errors.push(`${path.relative(root,page)} -> ${link} introuvable`)}}
const css=await readFile("assets/css/styles.css","utf8");if(/overflow-x\s*:\s*hidden/.test(css))errors.push("CSS: overflow-x hidden masque potentiellement un défaut mobile");
if(errors.length){console.error(errors.join("\n"));process.exit(1)}
console.log(`Liens valides : ${pages.length} pages HTML contrôlées, aucun asset interne manquant.`);
