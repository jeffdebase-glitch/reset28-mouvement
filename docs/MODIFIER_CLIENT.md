# Modifier un client

Ouvrir uniquement `clients/<identifiant>/program.json`.

- Changer un exercice : remplacer son slug par un slug présent dans `data/exercises.json`.
- Changer séries/répétitions : modifier le deuxième élément de la ligne.
- Changer le repos : modifier le troisième élément.
- Changer semaines 3-4 : éditer seulement les blocs `number: 3` et `number: 4` du JSON générateur concerné, puis reconstruire.

Après chaque changement : `npm run check`, commit, puis ouvrir la page publique et une fiche cliquée.

Ne jamais dupliquer ni modifier une fiche d'exercice pour un seul client.

Les liens restent centralisés : la navigation de retour vers le client est ajoutée automatiquement par `assets/js/client-links.js`. Après une modification, tester une tuile depuis la page client, le bouton « Retour à mon programme » et un lien de progression.
