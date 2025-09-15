import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Package, Truck, Clock, MapPin, Shield } from "lucide-react";

const Livraison = () => {
  return (
    <div className="min-h-screen" id="top">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8">Livraison & Expédition</h1>

          <Card>
            <CardContent className="p-6 md:p-8 space-y-8">
              <div className="grid gap-6">
                <div className="flex items-start gap-4">
                  <Truck className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Livraison Gratuite</h2>
                    <p className="text-muted-foreground">
                      Profitez de la livraison gratuite sur toutes vos commandes en France métropolitaine, sans minimum d'achat.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Délais de Livraison</h2>
                    <p className="text-muted-foreground">
                      3 à 5 jours ouvrés en France métropolitaine. Expédition sous 24h pour toute commande passée avant 14h.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Package className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Suivi de Commande</h2>
                    <p className="text-muted-foreground">
                      Recevez un email avec votre numéro de suivi dès l'expédition. Suivez votre colis en temps réel jusqu'à sa livraison.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Processus de Livraison</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Étape 1 : Validation de la commande</p>
                      <p className="text-sm text-muted-foreground">Vous recevez un email de confirmation immédiatement après votre achat.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Étape 2 : Préparation</p>
                      <p className="text-sm text-muted-foreground">Votre commande est préparée avec soin dans nos entrepôts sous 24h.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Étape 3 : Expédition</p>
                      <p className="text-sm text-muted-foreground">Remise au transporteur avec envoi du numéro de suivi par email.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Étape 4 : Livraison</p>
                      <p className="text-sm text-muted-foreground">Livraison à l'adresse indiquée ou en point relais selon votre choix.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Zones de Livraison</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">France métropolitaine</p>
                      <p className="text-sm text-muted-foreground">Livraison gratuite en 3-5 jours ouvrés</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">DOM-TOM</p>
                      <p className="text-sm text-muted-foreground">Nous contacter pour les modalités et tarifs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">International</p>
                      <p className="text-sm text-muted-foreground">Service bientôt disponible</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Transporteur</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Nous travaillons avec <strong>La Poste Colissimo</strong> pour garantir une livraison rapide et sécurisée de vos commandes.
                  </p>
                  <p>
                    Colissimo offre plusieurs avantages :
                  </p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Livraison à domicile avec ou sans signature</li>
                    <li>Possibilité de livraison en point relais</li>
                    <li>Suivi en temps réel de votre colis</li>
                    <li>Service client réactif</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Emballage</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Nous accordons une attention particulière à l'emballage de vos produits :
                  </p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Emballage discret et sécurisé</li>
                    <li>Protection optimale du produit</li>
                    <li>Matériaux recyclables</li>
                    <li>Format adapté aux boîtes aux lettres standard</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Que faire en cas de problème ?</h2>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium mb-2">Colis non reçu</p>
                    <p className="text-sm text-muted-foreground">
                      Si vous n'avez pas reçu votre colis dans les délais annoncés, vérifiez d'abord le suivi en ligne.
                      Contactez-nous ensuite à contact@byesweetie.fr avec votre numéro de commande.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Colis endommagé</p>
                    <p className="text-sm text-muted-foreground">
                      En cas de colis endommagé, refusez la livraison ou émettez des réserves auprès du transporteur.
                      Prenez des photos et contactez-nous immédiatement.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Erreur d'adresse</p>
                    <p className="text-sm text-muted-foreground">
                      Si vous constatez une erreur dans l'adresse de livraison, contactez-nous dans les 2 heures suivant votre commande
                      pour que nous puissions la modifier.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Garantie de Livraison</h2>
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-muted-foreground">
                    <p className="mb-2">
                      Nous garantissons la bonne réception de votre commande. En cas de perte ou de vol pendant le transport,
                      nous nous engageons à renvoyer votre commande gratuitement ou à vous rembourser intégralement.
                    </p>
                    <p>
                      Votre satisfaction est notre priorité absolue.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-secondary rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Besoin d'aide ?</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p>Notre service client est disponible pour répondre à toutes vos questions concernant la livraison :</p>
                  <p><strong>Email :</strong> <a href="mailto:contact@byesweetie.fr" className="text-primary hover:underline">contact@byesweetie.fr</a></p>
                  <p><strong>Réponse garantie :</strong> sous 2 heures (jours ouvrés, 9h-18h)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Livraison;