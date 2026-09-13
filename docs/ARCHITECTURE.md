# Architecture

## Source de vérité

- `src/exercises.mjs` : contenu éditorial maître et métadonnées des exercices.
- `data/exercises.json` : catalogue structuré généré, exploitable par ChatGPT et le site.
- `src/demo-program.mjs` : programme fictif de démonstration.
- `clients/<identifiant>/program.json` : seul fichier à personnaliser pour un client.

## Génération

`npm run build` produit les 42 fiches HTML, les 42 SVG animés, le JSON central et le client `DEMO`.

## URLs

- Bibliothèque : `/`
- Fiche : `/exercices/<slug>/`
- Client : `/clients/<identifiant-non-evident>/`

Les pages clients sont publiques par lien et marquées `noindex,nofollow`. Ne jamais y inclure poids, pathologie, coordonnées ou notes de coaching.
