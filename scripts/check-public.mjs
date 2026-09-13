import {readdir,readFile,stat} from "node:fs/promises";
import path from "node:path";

const base=new URL(process.env.RESET28_PUBLIC_URL||"https://jeffdebase-glitch.github.io/reset28-mouvement/");
const pages=[];
async function walk(dir){
  for(const name of await readdir(dir)){
    if([".git","node_modules","output","tmp","upload","template"].includes(name))continue;
    const file=path.join(dir,name),info=await stat(file);
    if(info.isDirectory())await walk(file);
    else if(file.endsWith(".html"))pages.push(file);
  }
}
await walk(process.cwd());

const urls=new Set();
for(const page of pages){
  const rel=path.relative(process.cwd(),page).replaceAll(path.sep,"/");
  const publicPath=rel.endsWith("/index.html")?rel.slice(0,-10):rel==="index.html"?"":rel;
  const pageUrl=new URL(publicPath,base);
  urls.add(pageUrl.href);
  const html=await readFile(page,"utf8");
  for(const match of html.matchAll(/(?:href|src)="([^"#]+)"/g)){
    const ref=match[1];
    if(/^(?:https?:|mailto:|data:)/.test(ref))continue;
    urls.add(new URL(ref,pageUrl).href);
  }
}

const queue=[...urls],errors=[];
async function worker(){
  while(queue.length){
    const url=queue.shift();
    try{
      const response=await fetch(url,{redirect:"follow"});
      if(!response.ok)errors.push(`${response.status} ${url}`);
      else await response.arrayBuffer();
    }catch(error){errors.push(`${url} — ${error.message}`);}
  }
}
await Promise.all(Array.from({length:10},worker));
if(errors.length){console.error(errors.join("\n"));process.exit(1);}
console.log(`Publication valide : ${pages.length} pages HTML et ${urls.size} URLs publiques contrôlées.`);
