# Architecture

## Source de vérité

- `src/exercises.mjs` : contenu éditorial maître et métadonnées des exercices.
- `data/exercises.json` : catalogue structuré généré, exploitable par ChatGPT et le site.
- `src/demo-program.mjs` : programme fictif de démonstration.
- `clients/<identifiant>/program.json` : seul fichier à personnaliser pour un client.

## Génération

`npm run build` produit les 43 fiches HTML, les 43 SVG animés, le JSON central et le client `DEMO`.

## URLs

- Bibliothèque : `/`
- Fiche : `/exercices/<slug>/`
- Client : `/clients/<identifiant-non-evident>/`

Les pages clients sont publiques par lien et marquées `noindex,nofollow`. Ne jamais y inclure poids, pathologie, coordonnées ou notes de coaching.

## Navigation client → fiche exercice

Chaque lien d'exercice affiché dans un programme client est enrichi au chargement par `assets/js/client-links.js` avec le chemin de retour du programme. La fiche centrale charge `assets/js/exercise.js` : son bouton principal devient **« Retour à mon programme »** et les liens de progression conservent ce même contexte. Depuis la bibliothèque centrale, la fiche conserve **« Tous les exercices »**. Le bouton retour du navigateur reste toujours disponible.
