// Une fiche ouverte depuis un programme client doit y ramener directement.
const params = new URLSearchParams(location.search);
const returnPath = params.get("return");
const isClientPath = value => typeof value === "string" && /^\/[^?#]*\/clients\/[^/?#]+\/?(?:\?[^#]*)?(?:#.*)?$/.test(value);

if (isClientPath(returnPath)) {
  const returnUrl = new URL(returnPath, location.origin);
  if (returnUrl.origin === location.origin) {
    const back = document.querySelector(".back-link");
    if (back) {
      back.href = returnUrl.href;
      back.textContent = "← Retour à mon programme";
      back.setAttribute("aria-label", "Retour à mon programme");
    }
    const headerLink = document.querySelector(".nav-link");
    if (headerLink) {
      headerLink.href = returnUrl.href;
      headerLink.textContent = "Mon programme";
      headerLink.setAttribute("aria-label", "Retour à mon programme");
    }
    document.querySelectorAll(".progress-link[href]").forEach(link => {
      const next = new URL(link.href, location.href);
      next.searchParams.set("return", returnPath);
      link.href = next.href;
    });
  }
}
