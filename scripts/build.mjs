import {mkdir,writeFile,readFile,cp} from "node:fs/promises";
import {exercises} from "../src/exercises.mjs";
import {demoProgram} from "../src/demo-program.mjs";

const esc = value => String(value).replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
const list = items => `<ul>${items.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`;

function libraryCard(item){
  const haystack=[item.nom,item.famille,...item.muscles,...item.materiel,...item.environnement].join(" ");
  return `<article class="exercise-card" data-family="${esc(item.famille)}" data-search="${esc(haystack)}"><a href="${item.url}" aria-label="Voir ${esc(item.nom)}"><div class="card-visual"><img src="${item.animation}" alt="" loading="lazy" width="640" height="480"></div><div class="card-body"><div class="tag-row"><span class="tag">${esc(item.famille)}</span><span class="tag level">${esc(item.niveau_min)}</span></div><h2 class="card-title">${esc(item.nom)}</h2><p class="card-desc">${esc(item.environnement.join(" · "))} · ${esc(item.materiel.join(", "))}</p><span class="arrow">Voir le mouvement →</span></div></a></article>`;
}

function libraryPage(rows){
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#ffffff"><meta name="description" content="Bibliothèque centrale des mouvements RESET28 : exercices simples, progressifs et adaptés à la maison ou à la salle."><title>Bibliothèque d'exercices · RESET28 Mouvement</title><link rel="icon" href="assets/logo/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/css/styles.css"></head><body><a class="skip" href="#main">Aller au contenu</a><header class="site-header"><div class="shell header-inner"><a class="brand" href="./"><span class="brand-mark">R28</span><span>RESET28</span></a><a class="nav-link" href="clients/DEMO/">Voir le client test</a></div></header><main id="main"><section class="hero"><div class="shell"><p class="eyebrow">RESET28 · Bouger simplement</p><h1>Bibliothèque<br>d'exercices</h1><p class="lead">Des mouvements clairs, progressifs et rapides à consulter depuis un téléphone.</p><div class="notice"><strong>Une fiche, un mouvement.</strong>Regarde l'animation, lis les trois étapes, puis privilégie une exécution confortable et contrôlée.</div></div></section><section class="controls" aria-label="Filtrer la bibliothèque"><div class="shell"><div class="search-wrap"><label class="skip" for="search">Rechercher un exercice</label><input class="search" id="search" type="search" placeholder="Rechercher : squat, dos, élastique…" autocomplete="off"></div><div class="filters" role="group" aria-label="Familles de mouvements">${["Tous","Bas du corps","Poussée","Tirage / dos","Épaules","Tronc","Corps entier"].map((x,i)=>`<button class="chip" data-family="${esc(x)}" aria-pressed="${i===0}">${esc(x)}</button>`).join("")}</div><div class="library-meta"><span id="result-count">${rows.length} exercices</span><span>Maison · Salle</span></div></div></section><section class="shell exercise-grid" id="exercise-grid" aria-live="polite">${rows.map(libraryCard).join("")}</section></main><footer class="site-footer"><div class="shell footer-inner"><span>RESET28 · Simple. Personnalisé. Applicable.</span><a href="docs/sources.html">Sources & cadre de sécurité</a></div></footer><script src="assets/js/library.js" defer></script></body></html>`;
}

function clientPage(program, rows){
  const bySlug=new Map(rows.map(x=>[x.slug,x]));
  const weeks=program.weeks.map(w=>`<section class="week" id="semaine-${w.number}"><div class="week-head"><div><div class="week-kicker">Semaine ${w.number}</div><h2>Semaine ${w.number}</h2></div><div class="week-focus">${esc(w.focus)}</div></div>${w.sessions.map(s=>`<article class="session"><div class="session-head"><h3>${esc(s.name)}</h3><span class="duration">${esc(s.duration)}</span></div><div class="program-list">${s.items.map(([slug,dose,rest])=>{const x=bySlug.get(slug);return `<a class="program-item" href="../../${x.url}"><img class="program-thumb" src="../../${x.animation}" alt="" loading="lazy" width="52" height="52"><div><div class="program-name">${esc(x.nom)}</div><div class="program-dose">${esc(dose)}</div></div><div class="program-rest">Repos ${esc(rest)}</div><span class="program-arrow" aria-hidden="true">→</span></a>`}).join("")}</div></article>`).join("")}</section>`).join("");
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#ffffff"><meta name="robots" content="noindex,nofollow"><title>${esc(program.client.display_name)} · RESET28 Mouvement</title><link rel="icon" href="../../assets/logo/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="../../assets/css/styles.css"></head><body><a class="skip" href="#main">Aller au contenu</a><header class="site-header"><div class="shell header-inner"><a class="brand" href="../../"><span class="brand-mark">R28</span><span>RESET28</span></a><a class="nav-link" href="../../">Bibliothèque</a></div></header><main id="main"><section class="client-hero"><div class="shell"><p class="eyebrow">RESET28 · Ton mouvement</p><h1>Le reset de<br><span>${esc(program.client.display_name)}</span></h1><p class="client-title">${esc(program.client.title)}</p><p class="client-dates">${esc(program.client.dates)}</p><span class="client-notice">${esc(program.client.notice)}</span></div></section><div class="shell"><section class="quick-card"><h2>Ton minimum viable</h2><p>${esc(program.minimum_viable)}</p><ul>${program.reminders.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></section><nav class="week-nav" aria-label="Accès rapide aux semaines">${program.weeks.map(w=>`<a href="#semaine-${w.number}" aria-label="Aller à la semaine ${w.number}">${w.number}</a>`).join("")}</nav><div id="program-root">${weeks}</div></div></main><footer class="site-footer"><div class="shell footer-inner"><span>RESET28 · Le sport complète le RESET.</span><a href="../../">Bibliothèque des mouvements</a></div></footer></body></html>`;
}

const poses = {
  stand:{head:[160,45],neck:[160,68],hip:[160,145],lShoulder:[140,78],rShoulder:[180,78],lElbow:[128,112],rElbow:[192,112],lWrist:[124,145],rWrist:[196,145],lKnee:[145,200],rKnee:[175,200],lAnkle:[140,258],rAnkle:[180,258]},
  squat:{head:[160,75],neck:[160,96],hip:[160,168],lShoulder:[138,106],rShoulder:[182,106],lElbow:[120,136],rElbow:[200,136],lWrist:[142,150],rWrist:[178,150],lKnee:[125,205],rKnee:[195,205],lAnkle:[112,258],rAnkle:[208,258]},
  lungeA:{head:[145,48],neck:[145,70],hip:[150,145],lShoulder:[130,80],rShoulder:[168,80],lElbow:[120,115],rElbow:[180,115],lWrist:[118,150],rWrist:[184,150],lKnee:[112,200],rKnee:[205,205],lAnkle:[88,258],rAnkle:[230,258]},
  lungeB:{head:[145,75],neck:[145,96],hip:[150,166],lShoulder:[127,106],rShoulder:[169,106],lElbow:[118,140],rElbow:[181,140],lWrist:[116,171],rWrist:[185,171],lKnee:[112,210],rKnee:[205,214],lAnkle:[88,258],rAnkle:[230,258]},
  seated:{head:[150,72],neck:[150,94],hip:[150,165],lShoulder:[130,105],rShoulder:[170,105],lElbow:[118,137],rElbow:[182,137],lWrist:[118,170],rWrist:[182,170],lKnee:[112,202],rKnee:[188,202],lAnkle:[105,258],rAnkle:[195,258]},
  seatedPress:{head:[150,72],neck:[150,94],hip:[150,165],lShoulder:[130,105],rShoulder:[170,105],lElbow:[106,104],rElbow:[194,104],lWrist:[88,104],rWrist:[212,104],lKnee:[112,202],rKnee:[188,202],lAnkle:[105,258],rAnkle:[195,258]},
  rowStart:{head:[150,65],neck:[150,87],hip:[150,158],lShoulder:[128,98],rShoulder:[172,98],lElbow:[100,118],rElbow:[200,118],lWrist:[73,135],rWrist:[227,135],lKnee:[128,205],rKnee:[172,205],lAnkle:[122,258],rAnkle:[178,258]},
  rowEnd:{head:[150,65],neck:[150,87],hip:[150,158],lShoulder:[128,98],rShoulder:[172,98],lElbow:[105,105],rElbow:[195,105],lWrist:[127,112],rWrist:[173,112],lKnee:[128,205],rKnee:[172,205],lAnkle:[122,258],rAnkle:[178,258]},
  pressStart:{head:[160,62],neck:[160,84],hip:[160,155],lShoulder:[138,95],rShoulder:[182,95],lElbow:[110,110],rElbow:[210,110],lWrist:[110,82],rWrist:[210,82],lKnee:[145,205],rKnee:[175,205],lAnkle:[140,260],rAnkle:[180,260]},
  pressEnd:{head:[160,62],neck:[160,84],hip:[160,155],lShoulder:[138,95],rShoulder:[182,95],lElbow:[130,62],rElbow:[190,62],lWrist:[134,30],rWrist:[186,30],lKnee:[145,205],rKnee:[175,205],lAnkle:[140,260],rAnkle:[180,260]},
  wallPushA:{head:[205,62],neck:[195,84],hip:[164,154],lShoulder:[190,96],rShoulder:[196,101],lElbow:[223,102],rElbow:[227,109],lWrist:[263,110],rWrist:[266,118],lKnee:[140,204],rKnee:[148,207],lAnkle:[116,258],rAnkle:[125,258]},
  wallPushB:{head:[235,67],neck:[222,88],hip:[180,158],lShoulder:[216,101],rShoulder:[222,106],lElbow:[238,130],rElbow:[243,136],lWrist:[263,110],rWrist:[266,118],lKnee:[150,207],rKnee:[158,210],lAnkle:[116,258],rAnkle:[125,258]},
  inclineA:{head:[235,112],neck:[214,125],hip:[155,162],lShoulder:[204,141],rShoulder:[209,148],lElbow:[226,164],rElbow:[232,170],lWrist:[257,190],rWrist:[264,194],lKnee:[112,190],rKnee:[116,197],lAnkle:[72,220],rAnkle:[76,227]},
  inclineB:{head:[245,149],neck:[222,158],hip:[160,180],lShoulder:[212,173],rShoulder:[217,180],lElbow:[226,202],rElbow:[232,207],lWrist:[257,190],rWrist:[264,194],lKnee:[114,205],rKnee:[118,212],lAnkle:[72,230],rAnkle:[76,237]},
  legPressA:{head:[104,80],neck:[115,100],hip:[135,170],lShoulder:[125,112],rShoulder:[132,116],lElbow:[145,145],rElbow:[150,150],lWrist:[160,170],rWrist:[166,175],lKnee:[198,185],rKnee:[202,195],lAnkle:[225,145],rAnkle:[232,153]},
  legPressB:{head:[104,80],neck:[115,100],hip:[135,170],lShoulder:[125,112],rShoulder:[132,116],lElbow:[145,145],rElbow:[150,150],lWrist:[160,170],rWrist:[166,175],lKnee:[205,158],rKnee:[210,168],lAnkle:[275,125],rAnkle:[280,135]},
  pulldownA:{head:[160,74],neck:[160,96],hip:[160,172],lShoulder:[138,106],rShoulder:[182,106],lElbow:[128,68],rElbow:[192,68],lWrist:[120,34],rWrist:[200,34],lKnee:[130,210],rKnee:[190,210],lAnkle:[125,260],rAnkle:[195,260]},
  pulldownB:{head:[160,74],neck:[160,96],hip:[160,172],lShoulder:[138,106],rShoulder:[182,106],lElbow:[118,122],rElbow:[202,122],lWrist:[130,105],rWrist:[190,105],lKnee:[130,210],rKnee:[190,210],lAnkle:[125,260],rAnkle:[195,260]},
  supinePressA:{head:[72,210],neck:[96,210],hip:[174,212],lShoulder:[108,190],rShoulder:[108,230],lElbow:[118,155],rElbow:[118,263],lWrist:[148,150],rWrist:[148,268],lKnee:[225,190],rKnee:[225,230],lAnkle:[262,225],rAnkle:[262,245]},
  supinePressB:{head:[72,210],neck:[96,210],hip:[174,212],lShoulder:[108,190],rShoulder:[108,230],lElbow:[150,180],rElbow:[150,220],lWrist:[182,180],rWrist:[182,220],lKnee:[225,190],rKnee:[225,230],lAnkle:[262,225],rAnkle:[262,245]},
  supine:{head:[72,204],neck:[96,204],hip:[174,206],lShoulder:[108,185],rShoulder:[108,220],lElbow:[112,145],rElbow:[112,247],lWrist:[116,110],rWrist:[116,276],lKnee:[225,168],rKnee:[225,228],lAnkle:[262,168],rAnkle:[262,228]},
  bridge:{head:[72,222],neck:[96,222],hip:[174,190],lShoulder:[108,210],rShoulder:[108,232],lElbow:[128,225],rElbow:[128,235],lWrist:[150,225],rWrist:[150,235],lKnee:[225,205],rKnee:[225,225],lAnkle:[262,238],rAnkle:[262,248]},
  plankHigh:{head:[248,118],neck:[225,128],hip:[155,160],lShoulder:[215,145],rShoulder:[218,155],lElbow:[220,188],rElbow:[225,195],lWrist:[225,228],rWrist:[232,228],lKnee:[112,180],rKnee:[112,188],lAnkle:[68,205],rAnkle:[70,214]},
  pushLow:{head:[250,155],neck:[226,163],hip:[155,180],lShoulder:[214,176],rShoulder:[218,184],lElbow:[210,210],rElbow:[218,214],lWrist:[230,232],rWrist:[238,232],lKnee:[112,195],rKnee:[112,203],lAnkle:[68,212],rAnkle:[70,220]},
  four:{head:[238,120],neck:[215,133],hip:[150,164],lShoulder:[202,150],rShoulder:[205,158],lElbow:[205,195],rElbow:[213,198],lWrist:[207,235],rWrist:[216,235],lKnee:[135,205],rKnee:[155,205],lAnkle:[112,235],rAnkle:[150,235]},
  bird:{head:[245,125],neck:[220,136],hip:[150,164],lShoulder:[205,150],rShoulder:[205,158],lElbow:[230,134],rElbow:[214,198],lWrist:[267,126],rWrist:[216,235],lKnee:[125,185],rKnee:[155,205],lAnkle:[78,165],rAnkle:[150,235]},
  sideLow:{head:[225,120],neck:[205,136],hip:[150,175],lShoulder:[193,150],rShoulder:[198,156],lElbow:[205,190],rElbow:[210,195],lWrist:[207,232],rWrist:[215,232],lKnee:[112,200],rKnee:[118,207],lAnkle:[75,225],rAnkle:[80,232]},
  sideHigh:{head:[225,90],neck:[205,108],hip:[150,145],lShoulder:[193,120],rShoulder:[198,126],lElbow:[205,172],rElbow:[210,177],lWrist:[207,224],rWrist:[215,224],lKnee:[112,172],rKnee:[118,179],lAnkle:[75,200],rAnkle:[80,207]}
};

function profile(name){
  if(name.startsWith("squat")) return [poses.stand,poses.squat];
  if(name.startsWith("lunge")||name==="step") return [poses.lungeA,poses.lungeB];
  if(name.startsWith("bridge")||name.startsWith("hip-thrust")) return [poses.supine,poses.bridge];
  if(name==="calf"){const b=structuredClone(poses.stand);for(const k of ["head","neck","hip","lShoulder","rShoulder","lElbow","rElbow","lWrist","rWrist","lKnee","rKnee"])b[k][1]-=10;b.lAnkle[1]-=4;b.rAnkle[1]-=4;return[poses.stand,b]}
  if(name==="push-wall"||name==="plank-wall") return [poses.wallPushA,name==="plank-wall"?poses.wallPushA:poses.wallPushB];
  if(name.includes("incline")) return [poses.inclineA,name.startsWith("plank")?poses.inclineA:poses.inclineB];
  if(name.includes("push")||name==="plank-floor") return [poses.plankHigh,name==="plank-floor"?poses.plankHigh:poses.pushLow];
  if(name==="leg-press"||name==="leg-curl") return [poses.legPressA,poses.legPressB];
  if(name==="press-seated") return [poses.seated,poses.seatedPress];
  if(name==="pulldown") return [poses.pulldownA,poses.pulldownB];
  if(name.includes("row")||name==="pull-apart"||name==="face-pull"||name==="pallof") return [poses.rowStart,poses.rowEnd];
  if(name==="wall-slide"||name==="shoulder-press"||name==="lateral-raise") return [poses.pressStart,poses.pressEnd];
  if(name.startsWith("deadbug")){const b=structuredClone(poses.supine);b.lWrist=[175,100];b.rAnkle=[290,245];return[poses.supine,b]}
  if(name==="bird-dog") return [poses.four,poses.bird];
  if(name.startsWith("side-plank")) return [poses.sideLow,poses.sideHigh];
  if(name==="farmer"){const b=structuredClone(poses.stand);b.lKnee=[150,200];b.lAnkle=[165,255];b.rKnee=[180,195];b.rAnkle=[195,245];return[poses.stand,b]}
  if(name==="press-bench") return [poses.supinePressA,poses.supinePressB];
  return [poses.stand,poses.rowEnd];
}

const joints=["head","neck","hip","lShoulder","rShoulder","lElbow","rElbow","lWrist","rWrist","lKnee","rKnee","lAnkle","rAnkle"];
const bones=[["neck","lShoulder"],["neck","rShoulder"],["neck","hip"],["lShoulder","lElbow"],["lElbow","lWrist"],["rShoulder","rElbow"],["rElbow","rWrist"],["hip","lKnee"],["lKnee","lAnkle"],["hip","rKnee"],["rKnee","rAnkle"]];
const attrAnim=(attr,a,b)=>`<animate attributeName="${attr}" values="${a};${b};${a}" dur="2.4s" repeatCount="indefinite" keyTimes="0;.5;1" calcMode="spline" keySplines=".4 0 .2 1;.4 0 .2 1"/>`;
function equipment(name){
  if(name.includes("chair"))return'<path d="M62 175h62v12H74v70H62z" fill="#fff" stroke="#118783" stroke-width="5"/><path d="M62 120h12v60H62z" fill="#118783"/>';
  if(name.includes("wall"))return'<path d="M270 25v245" stroke="#118783" stroke-width="8" stroke-linecap="round" opacity=".55"/>';
  if(name.includes("incline"))return'<path d="M215 190h92v14h-92zM284 202h12v60h-12z" fill="#118783" opacity=".55"/>';
  if(name==="step")return'<path d="M52 232h72v28H52z" fill="#118783" opacity=".5"/>';
  if(name.includes("band")||name.includes("pull")||name==="pallof")return'<path d="M58 134h64" stroke="#58bf16" stroke-width="5" stroke-dasharray="7 6"/>';
  if(name.includes("weight")||name.includes("dumbbell")||name.includes("farmer")||name.includes("press"))return'<g fill="#0d1734"><circle cx="112" cy="82" r="7"/><circle cx="208" cy="82" r="7"/></g>';
  if(name.includes("machine")||name==="leg-press"||name==="leg-curl"||name==="pulldown")return'<path d="M52 45v215M52 55h220M272 55v205" fill="none" stroke="#118783" stroke-width="5" opacity=".35"/>';
  return'';
}
function svg(item){
  const [a,b]=profile(item.animation_profile);const boneSvg=bones.map(([u,v])=>`<line x1="${a[u][0]}" y1="${a[u][1]}" x2="${a[v][0]}" y2="${a[v][1]}" stroke="#0d1734" stroke-width="12" stroke-linecap="round">${attrAnim("x1",a[u][0],b[u][0])}${attrAnim("y1",a[u][1],b[u][1])}${attrAnim("x2",a[v][0],b[v][0])}${attrAnim("y2",a[v][1],b[v][1])}</line>`).join("");
  const jointSvg=joints.filter(x=>x!=="head").map(k=>`<circle cx="${a[k][0]}" cy="${a[k][1]}" r="6" fill="#118783">${attrAnim("cx",a[k][0],b[k][0])}${attrAnim("cy",a[k][1],b[k][1])}</circle>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 300" role="img" aria-labelledby="title desc"><title id="title">${esc(item.nom)}</title><desc id="desc">Animation vectorielle en boucle montrant les deux positions principales du mouvement.</desc><rect width="320" height="300" rx="28" fill="#e7f7f4"/><path d="M35 266h250" stroke="#ccefeb" stroke-width="4" stroke-linecap="round"/>${equipment(item.animation_profile)}<g>${boneSvg}${jointSvg}<circle cx="${a.head[0]}" cy="${a.head[1]}" r="20" fill="#0d1734">${attrAnim("cx",a.head[0],b.head[0])}${attrAnim("cy",a.head[1],b.head[1])}</circle></g><circle cx="286" cy="26" r="9" fill="#58bf16"><animate attributeName="opacity" values=".35;1;.35" dur="2.4s" repeatCount="indefinite"/></circle></svg>`;
}

function exercisePage(item,bySlug){
  const reg=item.regression?bySlug.get(item.regression):null,prog=item.progression?bySlug.get(item.progression):null;
  const fact=(label,value)=>`<span class="fact"><strong>${label}</strong> ${esc(value)}</span>`;
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#ffffff"><meta name="description" content="${esc(item.description)}"><title>${esc(item.nom)} · RESET28 Mouvement</title><link rel="stylesheet" href="../../assets/css/styles.css"></head><body><a class="skip" href="#main">Aller au contenu</a><header class="site-header"><div class="shell header-inner"><a class="brand" href="../../"><span class="brand-mark">R28</span><span>RESET28</span></a><a class="nav-link" href="../../">Bibliothèque</a></div></header><main class="exercise-main" id="main"><div class="shell"><a class="back-link" href="../../">← Tous les exercices</a><div class="exercise-layout"><div><p class="eyebrow">${esc(item.famille)} · ${esc(item.niveau_min)}</p><h1 class="exercise-title">${esc(item.nom)}</h1><p class="exercise-subtitle">${esc(item.description)}</p><div class="facts">${fact("Lieu :",item.environnement.join(" / "))}${fact("Matériel :",item.materiel.join(", "))}${fact("Zones :",item.muscles.join(", "))}</div><div class="exercise-content"><section class="info-card"><h2>Position et exécution</h2><ol>${item.instructions.map(x=>`<li>${esc(x)}</li>`).join("")}</ol></section><section class="info-card"><h2>Les points qui comptent</h2>${list(item.points_cles)}</section><section class="info-card"><h2>Erreurs fréquentes</h2>${list(item.erreurs)}</section><section class="info-card"><h2>Respiration</h2><p>${esc(item.respiration)}</p></section><section class="info-card safety"><h2>Quand arrêter</h2><p>${esc(item.stop_rule)}</p></section><nav class="progression" aria-label="Progression du mouvement"><a class="progress-link${reg?'':' disabled'}" ${reg?`href="../${reg.slug}/"`:''}><small>Plus facile</small><strong>${reg?esc(reg.nom):"Pas de variante proposée"}</strong></a><a class="progress-link${prog?'':' disabled'}" ${prog?`href="../${prog.slug}/"`:''}><small>Plus difficile</small><strong>${prog?esc(prog.nom):"Progression par répétitions ou charge"}</strong></a></nav></div></div><aside class="animation-panel"><img src="../../${item.animation}" alt="Animation démontrant ${esc(item.nom)}" width="640" height="600"><p class="card-desc">Boucle pédagogique : observe surtout la trajectoire et le contrôle.</p></aside></div></div></main><footer class="site-footer"><div class="shell footer-inner"><span>RESET28 · Mouvement éducatif, non diagnostic.</span><a href="../../docs/sources.html">Sources & sécurité</a></div></footer></body></html>`;
}

await Promise.all([mkdir("data",{recursive:true}),mkdir("assets/animations",{recursive:true}),mkdir("clients/DEMO",{recursive:true}),mkdir("exercices",{recursive:true})]);
const publicRows=exercises.map(({animation_profile,...x})=>x);
await writeFile("data/exercises.json",JSON.stringify(publicRows,null,2)+"\n");
await writeFile("index.html",libraryPage(publicRows));
const bySlug=new Map(exercises.map(x=>[x.slug,x]));
for(const item of exercises){await mkdir(`exercices/${item.slug}`,{recursive:true});await writeFile(`exercices/${item.slug}/index.html`,exercisePage(item,bySlug));await writeFile(`assets/animations/${item.slug}.svg`,svg(item));}
await writeFile("clients/DEMO/index.html",clientPage(demoProgram,publicRows));
await writeFile("clients/DEMO/program.json",JSON.stringify(demoProgram,null,2)+"\n");
console.log(`Build terminé : ${exercises.length} fiches et ${exercises.length} animations.`);
