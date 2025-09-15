import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const CGV = () => {
  return (
    <div className="min-h-screen" id="top">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8">Conditions Générales de Vente</h1>

          <Card>
            <CardContent className="p-6 md:p-8 space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Article 1 - Objet</h2>
                <p className="text-muted-foreground">
                  Les présentes conditions générales de vente (CGV) régissent les ventes de produits sur le site www.byesweetie.fr.
                  Bye Sweetie commercialise des compléments alimentaires destinés à réduire les envies de sucre.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Article 2 - Prix</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Les prix de nos produits sont indiqués en euros toutes taxes comprises (TTC) incluant la TVA applicable au jour de la commande.
                  </p>
                  <p>
                    Bye Sweetie se réserve le droit de modifier ses prix à tout moment, mais le produit sera facturé sur la base du tarif en vigueur au moment de la validation de la commande.
                  </p>
                  <p>
                    Les frais de livraison sont offerts pour toute commande en France métropolitaine.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Article 3 - Commande</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Vous pouvez passer commande directement sur notre site internet www.byesweetie.fr.
                  </p>
                  <p>
                    La validation de votre commande implique l'acceptation intégrale des présentes CGV.
                  </p>
                  <p>
                    Bye Sweetie se réserve le droit d'annuler ou de refuser toute commande d'un client avec lequel il existerait un litige relatif au paiement d'une commande antérieure.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Article 4 - Paiement</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Le règlement de vos achats s'effectue par carte bancaire (Visa, Mastercard, American Express) via notre système de paiement sécurisé.
                  </p>
                  <p>
                    Le paiement est exigible immédiatement à la commande. Les données de paiement sont échangées en mode crypté grâce au protocole SSL.
                  </p>
                  <p>
                    Bye Sweetie a choisi Stripe comme prestataire de paiement. Les données bancaires ne sont pas conservées sur nos serveurs.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Article 5 - Livraison</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Les produits sont livrés à l'adresse de livraison indiquée lors de la commande, dans un délai de 48 à 72 heures ouvrées.
                  </p>
                  <p>
                    La livraison est effectuée par La Poste Colissimo. Un numéro de suivi vous sera communiqué par email dès l'expédition de votre commande.
                  </p>
                  <p>
                    En cas de retard de livraison, nous vous invitons à nous contacter à contact@byesweetie.fr.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Article 6 - Garantie Satisfait ou Remboursé</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Bye Sweetie offre une garantie "Satisfait ou Remboursé" de 30 jours à compter de la date de réception de votre commande.
                  </p>
                  <p>
                    Si vous n'êtes pas entièrement satisfait de nos produits, nous vous remboursons intégralement, sans condition.
                  </p>
                  <p>
                    Pour bénéficier de cette garantie, contactez notre service client à contact@byesweetie.fr en indiquant votre numéro de commande.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Article 7 - Droit de rétractation</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Conformément aux dispositions légales, vous disposez d'un délai de 14 jours à compter de la réception de vos produits pour exercer votre droit de rétractation sans avoir à justifier de motifs ni à payer de pénalité.
                  </p>
                  <p>
                    Les retours sont à effectuer dans leur état d'origine et complet permettant leur recommercialisation à l'état neuf.
                  </p>
                  <p>
                    Les frais de retour sont à la charge du client. Le remboursement sera effectué dans un délai de 14 jours suivant la réception du produit retourné.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Article 8 - Responsabilité</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Les produits proposés sont conformes à la législation française en vigueur. Bye Sweetie ne saurait être tenu pour responsable de l'inexécution du contrat en cas de force majeure, de perturbation ou grève des services postaux et moyens de transport.
                  </p>
                  <p>
                    Les compléments alimentaires ne se substituent pas à une alimentation variée et équilibrée et à un mode de vie sain. Ne pas dépasser la dose journalière recommandée.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Article 9 - Service Client</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p>Pour toute question ou réclamation, notre service client est à votre disposition :</p>
                  <p><strong>Email :</strong> contact@byesweetie.fr</p>
                  <p><strong>Téléphone :</strong> +33 1 23 45 67 89</p>
                  <p><strong>Horaires :</strong> Du lundi au vendredi de 9h à 18h</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Article 10 - Droit applicable et litiges</h2>
                <p className="text-muted-foreground">
                  Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. À défaut, les tribunaux français seront seuls compétents.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CGV;