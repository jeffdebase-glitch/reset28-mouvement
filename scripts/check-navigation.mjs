import {readdir,readFile,stat} from "node:fs/promises";
import path from "node:path";

const errors=[];
const exerciseScript=await readFile("assets/js/exercise.js","utf8");
const clientScript=await readFile("assets/js/client-links.js","utf8");
if(!exerciseScript.includes("Retour à mon programme")||!exerciseScript.includes("return"))errors.push("exercise.js: logique de navigation incomplète");
if(!clientScript.includes("MutationObserver")||!clientScript.includes("searchParams.set(\"return\""))errors.push("client-links.js: contexte de retour absent");

async function walk(dir){
  for(const name of await readdir(dir)){
    const file=path.join(dir,name),info=await stat(file);
    if(info.isDirectory())await walk(file);
    else if(name==="index.html"){
      const html=await readFile(file,"utf8");
      if(file.includes(`${path.sep}exercices${path.sep}`)&&!html.includes("assets/js/exercise.js"))errors.push(`${file}: script exercice absent`);
      if(file.includes(`${path.sep}clients${path.sep}`)&&!html.includes("assets/js/client-links.js"))errors.push(`${file}: script client absent`);
    }
  }
}
await walk(process.cwd());
if(errors.length){console.error(errors.join("\n"));process.exit(1);}
console.log("Navigation validée : fiches et pages client utilisent le retour contextuel.");
