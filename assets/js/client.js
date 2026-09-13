const root = document.querySelector("#program-root");
const esc = value => String(value).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));

Promise.all([fetch("program.json").then(r=>r.json()),fetch("../../data/exercises.json").then(r=>r.json())]).then(([program, rows]) => {
  const bySlug = new Map(rows.map(x=>[x.slug,x]));
  document.title = `${program.client.display_name} · RESET28 Mouvement`;
  document.querySelector("#client-name").textContent=program.client.display_name;
  document.querySelector("#client-title").textContent=program.client.title;
  document.querySelector("#client-dates").textContent=program.client.dates;
  document.querySelector("#client-notice").textContent=program.client.notice;
  document.querySelector("#minimum").textContent=program.minimum_viable;
  document.querySelector("#reminders").innerHTML=program.reminders.map(x=>`<li>${esc(x)}</li>`).join("");
  document.querySelector("#week-nav").innerHTML=program.weeks.map(w=>`<a href="#semaine-${w.number}" aria-label="Aller à la semaine ${w.number}">${w.number}</a>`).join("");
  root.innerHTML=program.weeks.map(w=>`<section class="week" id="semaine-${w.number}"><div class="week-head"><div><div class="week-kicker">Semaine ${w.number}</div><h2>Semaine ${w.number}</h2></div><div class="week-focus">${esc(w.focus)}</div></div>${w.sessions.map(s=>`<article class="session"><div class="session-head"><h3>${esc(s.name)}</h3><span class="duration">${esc(s.duration)}</span></div><div class="program-list">${s.items.map(([slug,dose,rest])=>{const x=bySlug.get(slug);if(!x)return "";return `<a class="program-item" href="../../${x.url}"><img class="program-thumb" src="../../${x.animation}" alt="" loading="lazy"><div><div class="program-name">${esc(x.nom)}</div><div class="program-dose">${esc(dose)}</div></div><div class="program-rest">Repos ${esc(rest)}</div><span class="program-arrow" aria-hidden="true">→</span></a>`}).join("")}</div></article>`).join("")}</section>`).join("");
}).catch(()=>{root.innerHTML='<p class="empty">Le programme ne peut pas être chargé pour le moment.</p>';});
