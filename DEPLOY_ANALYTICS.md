# Déploiement Analytics - Guide rapide

## Étape 1 : Commit et push

```bash
git add .
git commit -m "Add analytics dashboard with Vercel KV"
git push
```

## Étape 2 : Créer Vercel KV

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet
3. Cliquez sur **Storage** dans le menu latéral
4. Cliquez sur **Create Database**
5. Choisissez **KV** (Redis)
6. Nom : `kill-crave-analytics` (ou ce que vous voulez)
7. Région : Choisissez proche de vos utilisateurs (ex: Frankfurt pour l'Europe)
8. Cliquez sur **Create**

## Étape 3 : Lier la database au projet

1. Sur la page de votre KV database, cliquez sur l'onglet **Projects**
2. Cliquez sur **Connect Project**
3. Sélectionnez votre projet
4. Environnements : Cochez **Production**, **Preview**, et **Development**
5. Cliquez sur **Connect**

✅ Les variables d'environnement (`KV_URL`, `KV_REST_API_URL`, etc.) sont maintenant automatiquement ajoutées à votre projet !

## Étape 4 (Optionnel) : Ajouter un mot de passe

Si vous voulez protéger l'accès au dashboard :

1. Dans votre projet Vercel, allez dans **Settings** > **Environment Variables**
2. Cliquez sur **Add New**
3. **Key:** `ANALYTICS_PASSWORD`
4. **Value:** Votre mot de passe (ex: `monmotdepasse123`)
5. **Environments:** Cochez Production, Preview, Development
6. Cliquez sur **Save**

## Étape 5 : Redéployer

Si le dernier déploiement était avant de lier la KV database :

1. Allez dans l'onglet **Deployments**
2. Sur le dernier déploiement, cliquez sur les 3 points
3. Cliquez sur **Redeploy**

Sinon, votre déploiement depuis l'étape 1 devrait déjà être en cours.

## Étape 6 : Vérifier

Une fois déployé :

1. Allez sur `https://votre-site.com/analytics`
2. Si vous avez défini un mot de passe, entrez-le
3. Vous devriez voir le dashboard avec des compteurs à 0

## Test du tracking

1. Visitez `https://votre-site.com/` → Le compteur "Visiteurs totaux" devrait augmenter
2. Scannez un QR code → Le compteur "QR:flyers" devrait augmenter
3. Rafraîchissez `/analytics` pour voir les mises à jour

## Troubleshooting

### Erreur 401 "unauthorized"
→ Le mot de passe est incorrect ou la variable `ANALYTICS_PASSWORD` n'est pas définie

### Erreur 500 ou compteurs ne s'incrémentent pas
→ La database KV n'est pas liée au projet. Retournez à l'étape 3.

### Erreur "Not found" sur /analytics
→ Le déploiement n'a pas pris en compte les derniers changements. Push à nouveau.

### Les compteurs restent à 0
→ Vérifiez les logs Vercel (onglet Functions) pour voir les erreurs des serverless functions

## Accès aux logs

Pour debugger :

1. Vercel Dashboard → Votre projet
2. Onglet **Functions**
3. Cliquez sur une function (ex: `/api/analytics/track`)
4. Vous verrez les logs d'exécution

## Support

Pour vider les compteurs (réinitialiser) :

1. Vercel Dashboard → Storage → Votre KV database
2. Onglet **Data Browser**
3. Supprimez les clés individuellement

Ou utilisez le CLI :
```bash
npx @vercel/kv-cli del visits:total
```

---

C'est tout ! Votre analytics est maintenant opérationnel 🎉
