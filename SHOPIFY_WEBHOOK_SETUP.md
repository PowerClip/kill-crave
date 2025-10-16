# Configuration des Webhooks Shopify

Ce guide explique comment configurer les webhooks Shopify pour tracker automatiquement les achats réels dans vos analytics (Facebook Pixel, Google Analytics, TikTok, Vercel KV).

## Pourquoi configurer les webhooks ?

**Sans webhooks** : Vous trackez seulement quand quelqu'un clique sur "Commander" (`InitiateCheckout`), mais pas s'il paye vraiment.

**Avec webhooks** : Shopify vous notifie automatiquement quand un paiement est complété, et vos analytics reçoivent l'événement `Purchase` avec les vraies données de commande.

---

## Étape 1 : Obtenir votre Webhook Secret

Le webhook secret est une clé secrète générée par Shopify qui permet de vérifier que les webhooks proviennent bien de Shopify (sécurité HMAC).

### Où trouver le Webhook Secret

1. Allez dans **Shopify Admin** : https://admin.shopify.com/store/VOTRE_STORE
2. Menu **Settings** (Paramètres) en bas à gauche
3. Cliquez sur **Notifications**
4. Descendez jusqu'à la section **Webhooks**
5. Vous verrez une section "Webhook signing secret" ou "All your webhooks will be signed with"

   **Note** : Le secret est partagé par tous les webhooks. Il ressemble à : `shpss_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

6. **Copiez ce secret** (vous en aurez besoin plus tard)

---

## Étape 2 : Ajouter le Secret dans Vercel

Votre application a besoin de connaître ce secret pour valider les webhooks.

### En production (Vercel Dashboard)

1. Allez sur https://vercel.com/
2. Sélectionnez votre projet **kill-crave**
3. Allez dans **Settings** > **Environment Variables**
4. Ajoutez une nouvelle variable :
   - **Name** : `SHOPIFY_WEBHOOK_SECRET`
   - **Value** : Collez le secret Shopify (ex: `shpss_1234567890abcdef...`)
   - **Environments** : Cochez Production, Preview, Development
5. Cliquez sur **Save**

### En développement local (optionnel)

Si vous voulez tester les webhooks en local :

1. Créez ou éditez le fichier `.env.local` à la racine du projet
2. Ajoutez cette ligne :
   ```
   SHOPIFY_WEBHOOK_SECRET=shpss_votre_secret_ici
   ```

**Important** : Ne committez JAMAIS ce fichier dans Git (il est déjà dans `.gitignore`)

---

## Étape 3 : Créer le Webhook dans Shopify

Maintenant vous allez dire à Shopify d'envoyer une notification à votre serveur à chaque commande payée.

### 3.1 Obtenir votre URL de webhook

Votre URL de webhook est :
```
https://VOTRE_DOMAINE.vercel.app/api/webhooks/shopify
```

**Exemple** : Si votre site est `https://kill-crave.com`, l'URL sera :
```
https://kill-crave.com/api/webhooks/shopify
```

### 3.2 Créer le webhook

1. Dans **Shopify Admin** > **Settings** > **Notifications**
2. Descendez jusqu'à la section **Webhooks**
3. Cliquez sur **Create webhook** (Créer un webhook)

4. Remplissez le formulaire :
   - **Event** : Sélectionnez **Order payment** ou **Order creation**
     - Recommandé : **Order payment** → déclenche quand le paiement est confirmé
     - Alternative : **Order creation** → déclenche dès la création (peut inclure des commandes non payées)

   - **Format** : Sélectionnez **JSON**

   - **URL** : Collez votre URL de webhook
     ```
     https://kill-crave.com/api/webhooks/shopify
     ```

   - **Webhook API version** : Sélectionnez la dernière version stable (ex: `2025-01`)

5. Cliquez sur **Save** (Enregistrer)

---

## Étape 4 : Tester le webhook

Shopify permet de tester les webhooks sans créer une vraie commande.

### Option A : Envoyer un événement de test depuis Shopify

1. Dans **Shopify Admin** > **Settings** > **Notifications** > **Webhooks**
2. Trouvez votre webhook dans la liste
3. Cliquez sur le webhook
4. En haut à droite, cliquez sur **Send test notification**
5. Shopify enverra un événement de test à votre endpoint

### Option B : Créer une commande de test

1. Dans **Shopify Admin** > **Orders** > **Create order**
2. Ajoutez un produit
3. Ajoutez des informations client fictives
4. Marquez la commande comme "Paid" (Payée)
5. Votre webhook devrait être déclenché

### Vérifier que ça fonctionne

**Logs Vercel** :
1. Allez sur https://vercel.com/ > Votre projet
2. Cliquez sur **Deployments** > Votre dernier déploiement
3. Cliquez sur **View Function Logs**
4. Cherchez les logs du fichier `api/webhooks/shopify.js`
5. Vous devriez voir : `"Shopify order received"` et `"Purchase tracked successfully"`

**Analytics Dashboard** :
- Allez sur votre page `/analytics` (si configurée)
- Vérifiez que le compteur `events:Purchase` a augmenté

**Facebook Events Manager** :
1. Allez sur https://business.facebook.com/events_manager2
2. Sélectionnez votre Pixel
3. Cliquez sur **Test Events**
4. Vous devriez voir l'événement `Purchase` avec l'event_id `shopify_XXX`

---

## Dépannage

### Le webhook ne se déclenche pas

**Vérifications** :
1. Le webhook est bien créé dans Shopify Admin ?
2. L'URL du webhook est correcte (pas de faute de frappe) ?
3. Le webhook est sur l'événement **Order payment** ou **Order creation** ?

### Erreur 401 "Invalid signature"

**Cause** : Le `SHOPIFY_WEBHOOK_SECRET` dans Vercel ne correspond pas au secret Shopify.

**Solution** :
1. Vérifiez que vous avez copié le bon secret depuis Shopify Admin
2. Vérifiez que vous l'avez bien ajouté dans Vercel > Environment Variables
3. **Redéployez** votre application sur Vercel (les variables d'environnement nécessitent un redéploiement)

### Erreur 500 dans les logs

**Cause** : Erreur dans le traitement du webhook.

**Solution** :
1. Regardez les logs complets dans Vercel
2. Vérifiez que toutes les variables d'environnement sont configurées :
   - `SHOPIFY_WEBHOOK_SECRET` (obligatoire)
   - `FB_PIXEL_ID` (optionnel, pour Facebook CAPI)
   - `FB_CAPI_TOKEN` (optionnel, pour Facebook CAPI)
   - `VERCEL_KV_*` (optionnel, pour analytics KV)

### Les événements Purchase n'apparaissent pas dans Facebook

**Vérifications** :
1. `FB_PIXEL_ID` et `FB_CAPI_TOKEN` sont configurés dans Vercel ?
2. Le token CAPI est valide ? (System User token avec permissions `ads_management`)
3. Regardez les logs Vercel pour voir si "CAPI forward error" apparaît

---

## Webhooks multiples (optionnel)

Vous pouvez créer plusieurs webhooks pour différents événements :

- **Order payment** : Quand le paiement est confirmé (recommandé pour `Purchase`)
- **Order creation** : Dès qu'une commande est créée
- **Order cancellation** : Quand une commande est annulée (utile pour révoquer un événement Purchase)
- **Fulfillment creation** : Quand la commande est expédiée

Pour l'instant, **Order payment** suffit pour tracker les achats.

---

## Sécurité

**⚠️ Important** : Ne désactivez JAMAIS la validation HMAC dans le code. Sans elle, n'importe qui pourrait envoyer de fausses commandes à votre endpoint et fausser vos analytics.

Le code vérifie automatiquement la signature HMAC de chaque webhook. Si la signature est invalide, le webhook est rejeté avec une erreur 401.

---

## Résumé

Récapitulatif des étapes :

1. ✅ Copier le Webhook Secret depuis Shopify Admin
2. ✅ Ajouter `SHOPIFY_WEBHOOK_SECRET` dans Vercel Environment Variables
3. ✅ Créer un webhook dans Shopify Admin (Event: Order payment, Format: JSON)
4. ✅ Tester avec "Send test notification"
5. ✅ Vérifier les logs Vercel et Facebook Events Manager

Une fois configuré, chaque commande Shopify payée sera automatiquement trackée dans vos analytics ! 🎉

---

## Support

Si vous rencontrez des problèmes :

1. Vérifiez les logs dans Vercel Dashboard > Function Logs
2. Vérifiez que le webhook apparaît bien dans Shopify Admin > Webhooks
3. Testez avec "Send test notification" pour voir les erreurs
4. Vérifiez que toutes les variables d'environnement sont configurées

---

**Date de dernière mise à jour** : 2025-01-16
