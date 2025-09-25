import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const MentionsLegales = () => {
  return (
    <div className="min-h-screen" id="top">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8">Mentions Légales</h1>

          <Card>
            <CardContent className="p-6 md:p-8 space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Éditeur du site</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>Raison sociale :</strong> Kill Crave SAS</p>
                  <p><strong>Capital social :</strong> 10 000 €</p>
                  <p><strong>Siège social :</strong> 123 rue de la Paix, 75002 Paris, France</p>
                  <p><strong>RCS :</strong> Paris B 123 456 789</p>
                  <p><strong>TVA intracommunautaire :</strong> FR 12 345678901</p>
                  <p><strong>Email :</strong> support@killcrave.com</p>
                  <p><strong>Téléphone :</strong> +33 1 23 45 67 89</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Directeur de la publication</h2>
                <p className="text-muted-foreground">
                  Le directeur de la publication est Monsieur/Madame [Nom du directeur], en qualité de représentant légal de la société Kill Crave SAS.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Hébergeur</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>Raison sociale :</strong> Vercel Inc.</p>
                  <p><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
                  <p><strong>Site web :</strong> https://vercel.com</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Propriété intellectuelle</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                  </p>
                  <p>
                    La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
                  </p>
                  <p>
                    Les marques citées sur ce site sont déposées par les sociétés qui en sont propriétaires.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Responsabilité</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Les informations fournies sur ce site le sont à titre indicatif. Kill Crave SAS ne saurait garantir l'exactitude, la complétude, l'actualité des informations diffusées sur son site.
                  </p>
                  <p>
                    En conséquence, l'utilisateur reconnaît utiliser ces informations sous sa responsabilité exclusive.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Données personnelles</h2>
                <p className="text-muted-foreground">
                  Pour plus d'informations sur la collecte et le traitement de vos données personnelles, veuillez consulter notre <a href="/confidentialite" className="text-primary hover:underline">Politique de Confidentialité</a>.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Loi applicable et juridiction</h2>
                <p className="text-muted-foreground">
                  Les présentes mentions légales sont soumises au droit français. En cas de litige et à défaut d'accord amiable, le litige sera porté devant les tribunaux français conformément aux règles de compétence en vigueur.
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

export default MentionsLegales;