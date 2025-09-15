import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Cookies = () => {
  return (
    <div className="min-h-screen" id="top">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8">Politique de Cookies</h1>

          <Card>
            <CardContent className="p-6 md:p-8 space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Qu'est-ce qu'un cookie ?</h2>
                <p className="text-muted-foreground">
                  Un cookie est un petit fichier texte déposé sur votre ordinateur, tablette ou smartphone lors de la visite d'un site web.
                  Il permet au site de mémoriser vos actions et préférences (comme la connexion, la langue, la taille des caractères et autres préférences d'affichage)
                  pendant une période donnée, pour que vous n'ayez pas à les saisir à nouveau lors de votre prochaine visite ou navigation.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Les cookies que nous utilisons</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 text-primary">1. Cookies essentiels</h3>
                    <p className="text-muted-foreground mb-2">
                      Ces cookies sont nécessaires au fonctionnement du site et ne peuvent pas être désactivés. Ils sont généralement établis en réponse à des actions de votre part.
                    </p>
                    <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
                      <li>Cookies de session</li>
                      <li>Cookies de préférences de confidentialité</li>
                      <li>Cookies de panier d'achat</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2 text-primary">2. Cookies de performance et d'analyse</h3>
                    <p className="text-muted-foreground mb-2">
                      Ces cookies nous permettent de compter les visites et les sources de trafic afin de mesurer et d'améliorer les performances de notre site.
                    </p>
                    <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
                      <li>Google Analytics (_ga, _gid, _gat)</li>
                      <li>Hotjar (pour l'analyse du comportement utilisateur)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2 text-primary">3. Cookies de marketing</h3>
                    <p className="text-muted-foreground mb-2">
                      Ces cookies peuvent être installés par nos partenaires publicitaires. Ils peuvent être utilisés pour établir un profil de vos intérêts et vous proposer des publicités pertinentes sur d'autres sites.
                    </p>
                    <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
                      <li>Facebook Pixel</li>
                      <li>Google Ads</li>
                      <li>TikTok Pixel</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Durée de conservation des cookies</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>La durée de conservation des cookies varie selon leur type :</p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li><strong>Cookies de session :</strong> supprimés à la fermeture du navigateur</li>
                    <li><strong>Cookies persistants :</strong> conservés jusqu'à 13 mois maximum</li>
                    <li><strong>Cookies Google Analytics :</strong> 14 mois</li>
                    <li><strong>Cookies publicitaires :</strong> 90 jours</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Gestion de vos préférences cookies</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Vous pouvez à tout moment choisir de désactiver ces cookies. Votre navigateur peut également être paramétré pour vous signaler les cookies déposés dans votre ordinateur et vous demander de les accepter ou non.
                  </p>
                  <p>
                    Vous pouvez accepter ou refuser les cookies au cas par cas ou bien les refuser systématiquement une fois pour toutes.
                  </p>
                  <div className="mt-4">
                    <Button variant="outline" className="mr-3">
                      Accepter tous les cookies
                    </Button>
                    <Button variant="outline">
                      Personnaliser mes choix
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Comment configurer votre navigateur</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>La configuration de chaque navigateur est différente. Elle est décrite dans le menu d'aide de votre navigateur :</p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>
                      <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Chrome
                      </a>
                    </li>
                    <li>
                      <a href="https://support.mozilla.org/fr/kb/cookies-informations-sites-enregistrent" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Firefox
                      </a>
                    </li>
                    <li>
                      <a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Safari
                      </a>
                    </li>
                    <li>
                      <a href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Edge
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Impact de la désactivation des cookies</h2>
                <p className="text-muted-foreground">
                  Si vous désactivez les cookies, vous risquez de ne pas pouvoir utiliser certaines fonctionnalités de notre site, notamment :
                  la mémorisation de votre panier, la connexion à votre compte client, ou la personnalisation de votre expérience de navigation.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Contact</h2>
                <p className="text-muted-foreground">
                  Pour toute question concernant notre politique de cookies, vous pouvez nous contacter à :
                  <a href="mailto:contact@byesweetie.fr" className="text-primary hover:underline ml-1">contact@byesweetie.fr</a>
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

export default Cookies;