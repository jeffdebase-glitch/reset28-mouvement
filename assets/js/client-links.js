// Ajoute le contexte de retour aux fiches ouvertes depuis une page client.
// Cela fonctionne aussi pour les pages client statiques déjà publiées.
const returnPath = `${location.pathname}${location.search}${location.hash}`;
const addReturnContext = root => root.querySelectorAll("a.program-item[href]").forEach(link => {
  const target = new URL(link.href, location.href);
  if (!target.pathname.includes("/exercices/")) return;
  target.searchParams.set("return", returnPath);
  link.href = target.href;
});

addReturnContext(document);
const programRoot = document.querySelector("#program-root");
if (programRoot) new MutationObserver(() => addReturnContext(programRoot)).observe(programRoot, {childList: true, subtree: true});
