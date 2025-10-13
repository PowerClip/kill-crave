# Analytics Setup Guide

Ce guide vous explique comment configurer et utiliser le système d'analytics avec Vercel KV.

## Configuration Vercel KV

### 1. Créer une base de données Vercel KV

1. Allez sur votre dashboard Vercel
2. Sélectionnez votre projet
3. Allez dans l'onglet **Storage**
4. Cliquez sur **Create Database**
5. Choisissez **KV** (Redis)
6. Donnez-lui un nom (ex: `kill-crave-analytics`)
7. Sélectionnez la région (choisissez proche de vos utilisateurs)
8. Cliquez sur **Create**

### 2. Connecter la base de données au projet

1. Une fois créée, cliquez sur votre KV database
2. Allez dans l'onglet **Settings** puis **.env.local**
3. Vercel génère automatiquement les variables d'environnement :
   ```
   KV_URL="..."
   KV_REST_API_URL="..."
   KV_REST_API_TOKEN="..."
   KV_REST_API_READ_ONLY_TOKEN="..."
   ```
4. Ces variables sont **automatiquement ajoutées** à votre déploiement Vercel
5. Pour le développement local, copiez ces variables dans un fichier `.env.local`

### 3. Protection par mot de passe (optionnel)

Pour protéger l'accès au dashboard analytics :

1. Allez dans **Settings** > **Environment Variables**
2. Ajoutez une nouvelle variable :
   - **Name:** `ANALYTICS_PASSWORD`
   - **Value:** Votre mot de passe (ex: `mon-super-mot-de-passe-123`)
   - **Environments:** Production, Preview, Development
3. Cliquez sur **Save**
4. Redéployez votre application

Si vous ne définissez pas cette variable, le dashboard sera accessible sans mot de passe.

## Accéder au dashboard

Une fois déployé, accédez à votre dashboard analytics :

```
https://votre-site.com/analytics
```

Si un mot de passe est configuré, il vous sera demandé à l'ouverture.

## Métriques trackées

### Visiteurs
- **visits:total** - Nombre total de visites
- **device:iphone**, **device:android**, **device:mac**, **device:windows** - Par type d'appareil
- **device:mobile**, **device:desktop** - Mobile vs Desktop

### Pays
- **country:FR**, **country:BE**, **country:CH**, **country:CA**, **country:US** - Pays spécifiques
- **country:other** - Autres pays

### E-commerce
- **events:view_content** - Vues produit
- **events:add_to_cart** - Ajouts au panier
- **events:initiate_checkout** - Checkouts initiés

### QR Codes
- **qr:flyers:scans** - Scans des QR codes flyers

### Engagement
- **clicks:cta** - Clics sur les boutons CTA

## Dashboard Features

Le dashboard analytics inclut :

1. **Cartes de statistiques** - Vue d'ensemble des métriques clés
2. **Graphique par appareil** - Distribution iPhone/Android/Mac/Windows
3. **Graphique par pays** - Distribution géographique
4. **Funnel de conversion** - Parcours visiteur → vue produit → panier → checkout
5. **Stats QR Codes** - Performances des campagnes QR

## Comment ça fonctionne

1. **Tracking automatique** - Chaque visite de page est trackée automatiquement via `GAReporter.tsx`
2. **Détection device** - L'UserAgent est analysé pour détecter le type d'appareil
3. **Détection pays** - Vercel fournit automatiquement le pays via le header `x-vercel-ip-country`
4. **Stockage Redis** - Les compteurs sont incrémentés dans Vercel KV (très rapide)
5. **API endpoints** (Vercel Serverless Functions) :
   - `POST /api/analytics/track` - Pour incrémenter les métriques (fichier: `api/analytics/track.js`)
   - `GET /api/analytics/stats` - Pour récupérer toutes les stats (fichier: `api/analytics/stats.js`)

## Structure des fichiers

```
api/
  analytics/
    track.js      # Serverless function pour le tracking (JavaScript)
    stats.js      # Serverless function pour récupérer les stats (JavaScript)
src/
  lib/
    analytics-store.ts  # Fonctions client de tracking
    kv.ts              # Types TypeScript pour métriques
  pages/
    Analytics.tsx       # Page du dashboard
vercel.json            # Configuration pour exclure /api/* des rewrites
```

## Ajouter de nouvelles métriques

Pour tracker une nouvelle métrique :

1. Ajoutez-la dans `src/lib/analytics-store.ts` :
   ```typescript
   export function trackCustomEvent() {
     trackToKV({
       event: 'custom_event',
       metrics: ['custom:metric'],
     });
   }
   ```

2. Ajoutez la clé dans `api/analytics/stats.js` dans `getAnalyticsStats()` :
   ```javascript
   const keys = [
     // ... existing keys
     'custom:metric',
   ];
   ```

3. (Optionnel) Ajoutez le type dans `src/lib/kv.ts` :
   ```typescript
   export interface AnalyticsStats {
     // ... existing fields
     'custom:metric': number;
   }
   ```

4. Utilisez-la dans votre code :
   ```typescript
   import { trackCustomEvent } from '@/lib/analytics-store';

   // Dans un composant
   trackCustomEvent();
   ```

## Développement local

Pour tester localement :

1. Créez un fichier `.env.local` avec les variables KV de Vercel
2. Lancez le serveur : `npm run dev`
3. Le serveur utilisera automatiquement les variables d'environnement

## Coûts

**Vercel KV Free Tier :**
- 256 MB de storage
- 30,000 commandes par mois
- Largement suffisant pour un site avec trafic modéré

Si vous dépassez, Vercel vous proposera de passer à un plan payant.

## Support

Pour toute question sur l'analytics :
- Vérifiez les logs du serveur dans Vercel Dashboard
- Consultez la documentation Vercel KV : https://vercel.com/docs/storage/vercel-kv
