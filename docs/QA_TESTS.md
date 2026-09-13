# Contrôle qualité

## Commande automatique

`npm run check`

Elle reconstruit le site puis vérifie : schéma des exercices, IDs/slugs uniques, références de progression, programme DEMO, pages HTML, viewport, liens internes et assets.

## Passes obligatoires

1. Technique : build, casse, fichiers, routes, 404 internes, console et poids des assets.
2. Mobile : largeur 390 px, cibles tactiles, scroll, lisibilité, animation, retour, débordements.
3. Sport : niveaux, matériel/environnement, chaînes de progression, consignes, doublons et programme test.
4. RESET28 : simplicité, ton, charte, aucune donnée sensible, minimum viable et absence de surcharge.

Après correction, relancer la passe concernée puis `npm run check` complet.
