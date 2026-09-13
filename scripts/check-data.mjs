import {readFile} from "node:fs/promises";
const rows=JSON.parse(await readFile("data/exercises.json","utf8"));
const required=["id","slug","nom","famille","niveau_min","environnement","materiel","description","instructions","points_cles","erreurs","regression","progression","muscles","animation","url","stop_rule"];
const errors=[];const ids=new Set(),slugs=new Set();
for(const x of rows){for(const k of required)if(!(k in x))errors.push(`${x.slug||"?"}: champ ${k} absent`);if(ids.has(x.id))errors.push(`id dupliqué ${x.id}`);ids.add(x.id);if(slugs.has(x.slug))errors.push(`slug dupliqué ${x.slug}`);slugs.add(x.slug);if(x.instructions?.length<3)errors.push(`${x.slug}: moins de 3 étapes`);if(x.points_cles?.length<2||x.points_cles?.length>4)errors.push(`${x.slug}: points clés hors limite`);if(x.erreurs?.length<1)errors.push(`${x.slug}: erreurs absentes`);}
for(const x of rows)for(const k of ["regression","progression"])if(x[k]&&!slugs.has(x[k]))errors.push(`${x.slug}: ${k} inconnu ${x[k]}`);
if(rows.length<35||rows.length>45)errors.push(`nombre d'exercices hors cible: ${rows.length}`);
const program=JSON.parse(await readFile("clients/DEMO/program.json","utf8"));
if(program.weeks.length!==4)errors.push("programme DEMO: 4 semaines requises");
for(const w of program.weeks){if(w.sessions.length!==3)errors.push(`semaine ${w.number}: 3 séances attendues`);for(const s of w.sessions)for(const [slug] of s.items)if(!slugs.has(slug))errors.push(`programme: slug inconnu ${slug}`)}
if(errors.length){console.error(errors.join("\n"));process.exit(1)}
console.log(`Données valides : ${rows.length} exercices, IDs uniques, progressions et programme DEMO cohérents.`);
