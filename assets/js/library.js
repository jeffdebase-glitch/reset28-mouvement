const grid = document.querySelector("#exercise-grid");
const search = document.querySelector("#search");
const count = document.querySelector("#result-count");
const chips = [...document.querySelectorAll(".chip")];
let active = "Tous";
const cards = [...document.querySelectorAll(".exercise-card")];

const fold = value => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
function render(){
  const query = fold(search.value.trim());
  let visible=0;
  cards.forEach(card=>{const show=(active==="Tous"||card.dataset.family===active)&&(!query||fold(card.dataset.search).includes(query));card.hidden=!show;if(show)visible++;});
  count.textContent = `${visible} exercice${visible > 1 ? "s" : ""}`;
  grid.classList.toggle("is-empty",visible===0);
}

search.addEventListener("input", render);
chips.forEach(chip => chip.addEventListener("click", () => {active=chip.dataset.family;chips.forEach(c=>c.setAttribute("aria-pressed",String(c===chip)));render();}));
