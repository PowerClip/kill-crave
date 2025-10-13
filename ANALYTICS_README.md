# Analytics - Fix appliqué

## Problème rencontré
Erreur "Unexpected token '<', "<!doctype "... is not valid JSON" lors de l'accès au dashboard analytics.

## Cause
Les routes API étaient définies dans `server/index.mjs` mais Vercel utilise des **serverless functions** dans le dossier `api/`.

De plus, `vercel.json` redirigeait TOUTES les routes (y compris `/api/*`) vers `/`, empêchant les API endpoints de fonctionner.

## Solution appliquée

### 1. Création des Serverless Functions Vercel
Créé deux nouveaux fichiers dans `api/analytics/` :

- **api/analytics/track.js** - Endpoint pour tracker les métriques
  - Reçoit event + metrics depuis le client
  - Détecte le pays via header Vercel `x-vercel-ip-country`
  - Incrémente les compteurs dans Vercel KV

- **api/analytics/stats.js** - Endpoint pour récupérer les stats
  - Retourne toutes les métriques depuis Vercel KV
  - Protection par mot de passe optionnelle via `ANALYTICS_PASSWORD`

Note: Fichiers en JavaScript (.js) au lieu de TypeScript (.ts) pour éviter les problèmes de transpilation.

### 2. Fix vercel.json
Modifié le rewrite pour **exclure** les routes API :

```json
{
  "rewrites": [
    {
      "source": "/((?!api/).*)",
      "destination": "/"
    }
  ]
}
```

Avant : `/(.*)` → toutes les routes redirigées vers `/`
Après : `/((?!api/).*)` → toutes les routes SAUF `/api/*`

### 3. Installation des dépendances
Ajouté `@vercel/node` en devDependency pour les types TypeScript des serverless functions.

### 4. Mise à jour de server/index.mjs
Ajouté un try-catch pour KV dans l'endpoint `/api/track` pour ne pas planter en dev local si KV n'est pas configuré.

## Fichiers créés
- `api/analytics/track.js` (JavaScript pour compatibilité Vercel)
- `api/analytics/stats.js` (JavaScript pour compatibilité Vercel)

## Fichiers modifiés
- `vercel.json` - Fix des rewrites
- `server/index.mjs` - Gestion gracieuse du KV manquant
- `package.json` - Ajout de @vercel/node
- `ANALYTICS_SETUP.md` - Documentation mise à jour

## Comment tester

### En local (ne fonctionnera pas sans KV configuré)
Le dashboard affichera une erreur, c'est normal.

### Sur Vercel
1. Assurez-vous que Vercel KV est créé et lié au projet
2. Déployez avec `git push`
3. Allez sur `https://votre-site.com/analytics`

Les endpoints API fonctionneront automatiquement :
- `POST /api/analytics/track`
- `GET /api/analytics/stats`

## Notes importantes

- Les routes API Vercel sont **automatiquement** des serverless functions
- Chaque fichier dans `api/` devient une route (ex: `api/analytics/track.ts` → `/api/analytics/track`)
- Les variables d'environnement KV sont auto-ajoutées par Vercel lors de la liaison de la base de données
- Le header `x-vercel-ip-country` est fourni automatiquement par Vercel (gratuit)

## Prochaines étapes

Le système est maintenant prêt. Après déploiement :

1. Créer la base Vercel KV dans le dashboard
2. La lier au projet (variables d'env auto-ajoutées)
3. (Optionnel) Ajouter `ANALYTICS_PASSWORD` dans les variables d'environnement
4. Le dashboard `/analytics` fonctionnera immédiatement

Tout le tracking est automatique - aucune configuration supplémentaire nécessaire !
