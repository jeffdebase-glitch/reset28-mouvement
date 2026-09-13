const grid = document.querySelector("#exercise-grid");
const search = document.querySelector("#search");
const count = document.querySelector("#result-count");
const chips = [...document.querySelectorAll(".chip")];
let active = "Tous";
let data = [];

const fold = value => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const esc = value => String(value).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));

function card(item){
  const env = item.environnement.join(" · ");
  return `<article class="exercise-card"><a href="${item.url}" aria-label="Voir ${esc(item.nom)}">
    <div class="card-visual"><img src="${item.animation}" alt="" loading="lazy" width="640" height="480"></div>
    <div class="card-body"><div class="tag-row"><span class="tag">${esc(item.famille)}</span><span class="tag level">${esc(item.niveau_min)}</span></div>
    <h2 class="card-title">${esc(item.nom)}</h2><p class="card-desc">${esc(env)} · ${esc(item.materiel.join(", "))}</p><span class="arrow">Voir le mouvement →</span></div>
  </a></article>`;
}

function render(){
  const query = fold(search.value.trim());
  const rows = data.filter(item => (active === "Tous" || item.famille === active) && (!query || fold([item.nom,item.famille,...item.muscles,...item.materiel,...item.environnement].join(" ")).includes(query))));
  count.textContent = `${rows.length} exercice${rows.length > 1 ? "s" : ""}`;
  grid.innerHTML = rows.length ? rows.map(card).join("") : `<p class="empty">Aucun exercice ne correspond à cette recherche.</p>`;
}

fetch("data/exercises.json").then(r => {if(!r.ok) throw new Error("Catalogue indisponible"); return r.json();}).then(rows => {data=rows;render();}).catch(() => {grid.innerHTML='<p class="empty">La bibliothèque ne peut pas être chargée pour le moment.</p>';});
search.addEventListener("input", render);
chips.forEach(chip => chip.addEventListener("click", () => {active=chip.dataset.family;chips.forEach(c=>c.setAttribute("aria-pressed",String(c===chip)));render();}));
