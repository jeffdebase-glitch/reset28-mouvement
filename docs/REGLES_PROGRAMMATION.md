# Règles de programmation RESET28

## Décision de départ

Le niveau sportif, le lieu et le matériel sont trois dimensions séparées. Un débutant peut s'entraîner en salle ; un pratiquant confirmé peut s'entraîner à la maison.

Avant de programmer, confirmer : expérience réelle, activité actuelle, disponibilité, sommeil/récupération, gêne ou blessure, environnement, matériel et préférence.

## Repères par défaut

| Profil | Fréquence indicative | Durée indicative |
|---|---:|---:|
| Reprise / très sédentaire | 2 séances / semaine | 20-25 min |
| Débutant | 2 à 3 séances / semaine | 25-30 min |
| Intermédiaire | 3 séances / semaine | 30-40 min |
| Déjà entraîné | 3 à 4 séances / semaine | Selon le contexte réel |

Ces repères ne sont pas des prescriptions absolues.

## Construction simple

- Une séance complète comporte généralement 4 à 6 mouvements.
- Prioriser un bas du corps, une poussée, un tirage si possible, puis un exercice de tronc ; ajouter un mouvement seulement s'il sert l'objectif.
- Commencer le plus souvent par 2 séries et une difficulté qui laisse environ 2 à 3 répétitions possibles.
- Conserver les exercices assez longtemps pour apprendre le geste.
- Le minimum viable vaut souvent 1 tour de 3 à 5 mouvements ou 8 à 12 minutes.
- Ne jamais « rattraper » une séance manquée.

## Parcours de consultation

- Les exercices sélectionnés dans un programme client doivent utiliser exclusivement un slug existant dans `data/exercises.json`.
- Le lien de chaque tuile doit ouvrir la fiche centrale avec son contexte de retour ; le client doit pouvoir revenir directement à son programme sans passer par la bibliothèque générale.
- Ne pas créer de copie d'une fiche pour un client et ne pas remplacer ce parcours par une URL vers la liste générale des exercices.
- Une fiche ouverte directement depuis la bibliothèque conserve son accès « Tous les exercices » ; une fiche ouverte depuis un programme affiche « Retour à mon programme ».

## Progression sur 28 jours

Modifier un seul levier principal à la fois :

1. meilleure amplitude ou contrôle ;
2. 1 à 3 répétitions supplémentaires ;
3. une série supplémentaire ;
4. support légèrement plus bas ou variante suivante ;
5. petite augmentation de charge quand toutes les répétitions restent propres.

Rester sur la même semaine ou régresser si fatigue, douleur inhabituelle, sommeil dégradé ou technique qui se détériore.

## Sécurité

Le système ne diagnostique pas et ne remplace pas un avis médical ou kinésithérapique. Une limitation signalée impose une adaptation individuelle ; si elle dépasse le cadre du coach, demander un avis professionnel. Toute douleur inhabituelle, vive ou croissante conduit à arrêter le mouvement.
