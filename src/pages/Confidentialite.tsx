import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const Confidentialite = () => {
  return (
    <div className="min-h-screen" id="top">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8">Politique de Confidentialité</h1>

          <Card>
            <CardContent className="p-6 md:p-8 space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">1. Collecte des données personnelles</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Dans le cadre de notre activité, nous collectons et traitons les données personnelles suivantes :
                  </p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Nom et prénom</li>
                    <li>Adresse email</li>
                    <li>Numéro de téléphone</li>
                    <li>Adresse de livraison et de facturation</li>
                    <li>Données de paiement (traitées par notre prestataire Stripe)</li>
                    <li>Historique de commandes</li>
                    <li>Données de navigation (cookies)</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">2. Finalité du traitement</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Vos données personnelles sont collectées pour :</p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Traiter et livrer vos commandes</li>
                    <li>Gérer votre compte client</li>
                    <li>Vous envoyer des informations sur nos produits (avec votre consentement)</li>
                    <li>Répondre à vos demandes de renseignements</li>
                    <li>Améliorer notre service client</li>
                    <li>Respecter nos obligations légales et réglementaires</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">3. Base légale du traitement</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Le traitement de vos données personnelles est fondé sur :
                  </p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>L'exécution du contrat de vente</li>
                    <li>Votre consentement pour l'envoi de communications marketing</li>
                    <li>Notre intérêt légitime pour améliorer nos services</li>
                    <li>Le respect de nos obligations légales</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">4. Durée de conservation</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Nous conservons vos données personnelles pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées :
                  </p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Données clients : 3 ans après votre dernière commande</li>
                    <li>Données de facturation : 10 ans (obligation légale)</li>
                    <li>Cookies : 13 mois maximum</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">5. Destinataires des données</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Vos données peuvent être transmises à :
                  </p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Notre prestataire de paiement (Stripe)</li>
                    <li>Notre prestataire logistique (La Poste)</li>
                    <li>Notre hébergeur web (Vercel)</li>
                    <li>Nos outils d'analyse (Google Analytics)</li>
                  </ul>
                  <p className="mt-3">
                    Nous ne vendons ni ne louons vos données personnelles à des tiers.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">6. Vos droits</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Conformément au RGPD, vous disposez des droits suivants :
                  </p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li><strong>Droit d'accès :</strong> obtenir la confirmation que vos données sont traitées et en recevoir une copie</li>
                    <li><strong>Droit de rectification :</strong> corriger vos données inexactes ou incomplètes</li>
                    <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
                    <li><strong>Droit à la limitation :</strong> limiter le traitement de vos données</li>
                    <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
                    <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
                    <li><strong>Droit de retirer votre consentement :</strong> à tout moment pour les traitements basés sur le consentement</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">7. Sécurité des données</h2>
                <p className="text-muted-foreground">
                  Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre la destruction accidentelle ou illicite, la perte accidentelle, l'altération, la divulgation ou l'accès non autorisé.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">8. Cookies</h2>
                <p className="text-muted-foreground">
                  Notre site utilise des cookies pour améliorer votre expérience de navigation. Pour plus d'informations, consultez notre <a href="/cookies" className="text-primary hover:underline">Politique de Cookies</a>.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">9. Délégué à la protection des données</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p>Pour exercer vos droits ou pour toute question relative à la protection de vos données :</p>
                  <p><strong>Email :</strong> dpo@byesweetie.fr</p>
                  <p><strong>Adresse :</strong> Bye Sweetie - DPO, 123 rue de la Paix, 75002 Paris</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">10. Réclamation auprès de la CNIL</h2>
                <p className="text-muted-foreground">
                  Si vous estimez que le traitement de vos données personnelles constitue une violation de la réglementation, vous avez le droit d'introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) : www.cnil.fr
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

export default Confidentialite;