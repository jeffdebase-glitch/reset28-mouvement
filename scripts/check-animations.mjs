import {readFile,readdir} from "node:fs/promises";
import {createHash} from "node:crypto";
import {exercises} from "../src/exercises.mjs";
import {animationSceneSlugs,sceneFingerprint} from "../src/animation-scenes.mjs";
import {animationContrasts} from "../src/animation-audit.mjs";

const expected=new Set(exercises.map(x=>x.slug)),actual=new Set(animationSceneSlugs),errors=[];
for(const slug of expected)if(!actual.has(slug))errors.push(`Scène absente : ${slug}`);
for(const slug of actual)if(!expected.has(slug))errors.push(`Scène orpheline : ${slug}`);
for(const slug of expected)if(!animationContrasts[slug])errors.push(`Critère distinctif absent : ${slug}`);

const fingerprints=new Map();
for(const slug of expected){
  const fp=createHash("sha256").update(sceneFingerprint(slug)).digest("hex");
  if(fingerprints.has(fp))errors.push(`Scènes identiques : ${fingerprints.get(fp)} et ${slug}`);
  fingerprints.set(fp,slug);
}

const files=(await readdir("assets/animations")).filter(x=>x.endsWith(".svg"));
if(files.length!==exercises.length)errors.push(`${files.length} SVG pour ${exercises.length} exercices`);
const hashes=new Map();
for(const item of exercises){
  const file=`assets/animations/${item.slug}.svg`,svg=await readFile(file,"utf8");
  for(const token of ["<title","<desc","repeatCount=\"indefinite\"","marker-end=\"url(#arrow)\""])
    if(!svg.includes(token))errors.push(`${item.slug} : ${token} absent`);
  const hash=createHash("sha256").update(svg).digest("hex");
  if(hashes.has(hash))errors.push(`SVG identiques : ${hashes.get(hash)} et ${item.slug}`);
  hashes.set(hash,item.slug);
}

if(errors.length){console.error(errors.join("\n"));process.exit(1);}
console.log(`Animations valides : ${exercises.length} scènes spécifiques, ${exercises.length} signatures uniques et ${exercises.length} critères distinctifs.`);
