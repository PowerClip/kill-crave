import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const FAQ = () => {
  const categories = [
    {
      title: "Utilisation du produit",
      faqs: [
        {
          question: "Comment fonctionne le spray Kill Crave ?",
          answer: "La plante Gymnema neutralise temporairement les récepteurs du goût sucré sur la langue. En 30–60 minutes, le sucré devient fade et l'envie retombe — sans 'forcer'. C'est une méthode 100% naturelle et sans effets secondaires."
        },
        {
          question: "Comment l'utiliser au quotidien ?",
          answer: "1–2 pulvérisations avant les moments à risque (café de l'après‑midi, dessert, soirée). 90 doses = 30 jours à raison de 3 utilisations/jour. Le spray est compact et discret, vous pouvez l'emporter partout."
        },
        {
          question: "Combien de temps dure l'effet ?",
          answer: "L'effet dure environ 30 à 60 minutes après la pulvérisation. C'est suffisant pour passer les moments critiques où les envies de sucre sont les plus fortes."
        },
        {
          question: "Vais‑je encore sentir le reste des saveurs ?",
          answer: "Oui. Seule la note sucrée est atténuée. La texture, l'acide, l'amer et le salé restent. Vous pouvez continuer à apprécier vos repas normalement."
        },
        {
          question: "Puis-je l'utiliser plusieurs fois par jour ?",
          answer: "Oui, vous pouvez utiliser le spray jusqu'à 3-4 fois par jour selon vos besoins. Il n'y a pas de risque de surdosage avec notre formule naturelle."
        }
      ]
    },
    {
      title: "Résultats et bénéfices",
      faqs: [
        {
          question: "Quand apparaissent les résultats ?",
          answer: "L'effet sur l'envie est immédiat (30 secondes). Pour une énergie plus stable et une peau plus nette, comptez 2–3 semaines d'usage régulier. La perte de poids dépend de chaque personne."
        },
        {
          question: "Vais-je perdre du poids ?",
          answer: "En réduisant votre consommation de sucre, vous réduisez naturellement votre apport calorique. La plupart de nos clients constatent une perte de poids progressive, mais cela dépend de votre alimentation globale et de votre activité physique."
        },
        {
          question: "Et si je craque quand même ?",
          answer: "C'est un outil 'pare‑envie'. Si vous mangez sucré, aucun souci: l'effet s'estompe naturellement après 30–60 minutes. Ne culpabilisez pas, utilisez simplement le spray la prochaine fois."
        },
        {
          question: "Est-ce que cela remplace une alimentation équilibrée ?",
          answer: "Non, Kill Crave est un complément qui vous aide à réduire le sucre. Il est important de maintenir une alimentation variée et équilibrée pour votre santé."
        }
      ]
    },
    {
      title: "Sécurité et composition",
      faqs: [
        {
          question: "Est‑ce sûr ? Y a‑t‑il des contre‑indications ?",
          answer: "Formule à base de plante utilisée depuis des siècles. Évitez en cas de grossesse, d'allaitement ou de traitement médical (notamment diabète): demandez conseil à votre médecin."
        },
        {
          question: "Quelle est la composition exacte ?",
          answer: "Extrait de Gymnema Sylvestre, eau purifiée, glycérine végétale, arôme naturel de menthe. Sans sucre, sans édulcorant, sans conservateur artificiel."
        },
        {
          question: "Y a-t-il des effets secondaires ?",
          answer: "Aucun effet secondaire n'a été reporté avec une utilisation normale. Certaines personnes peuvent ressentir une légère sensation de picotement sur la langue qui disparaît rapidement."
        },
        {
          question: "Puis-je l'utiliser si je suis diabétique ?",
          answer: "Si vous êtes diabétique, consultez votre médecin avant utilisation. Le Gymnema peut avoir des effets sur la glycémie."
        }
      ]
    },
    {
      title: "Commande et livraison",
      faqs: [
        {
          question: "Comment passer commande ?",
          answer: "Cliquez sur le bouton 'Acheter' sur notre site. Vous serez redirigé vers notre page de paiement sécurisée. Remplissez vos informations et validez votre commande."
        },
        {
          question: "Quels moyens de paiement acceptez-vous ?",
          answer: "Nous acceptons les cartes bancaires (CB, Visa, Mastercard, American Express) via notre système de paiement sécurisé Stripe."
        },
        {
          question: "Livraison",
          answer: "Expédition sous 24h. Livraison gratuite en France métropolitaine en 3 à 5 jours ouvrés. Vous recevrez un email avec un numéro de suivi dès l'expédition."
        },
        {
          question: "Livrez-vous à l'étranger ?",
          answer: "Pour le moment, nous livrons uniquement en France métropolitaine. Nous travaillons à étendre notre service à d'autres pays."
        },
        {
          question: "Comment suivre ma commande ?",
          answer: "Vous recevrez un email de confirmation avec un numéro de suivi dès l'expédition de votre colis. Vous pourrez suivre votre livraison en temps réel."
        }
      ]
    },
    {
      title: "Garantie et retours",
      faqs: [
        {
          question: "Quelle est votre politique de retour ?",
          answer: "Garantie satisfait ou remboursé de 30 jours. Si vous n'êtes pas satisfait, nous vous remboursons intégralement, sans condition."
        },
        {
          question: "Comment demander un remboursement ?",
          answer: "Envoyez-nous un email à support@killcrave.com avec votre numéro de commande. Nous traiterons votre demande sous 48h."
        },
        {
          question: "Dois-je renvoyer le produit pour être remboursé ?",
          answer: "Pour un produit non ouvert, oui. Pour un produit ouvert dans le cadre de notre garantie satisfaction, contactez-nous pour connaître la procédure."
        },
        {
          question: "Combien de temps pour recevoir mon remboursement ?",
          answer: "Une fois votre demande validée, le remboursement est effectué sous 5 à 10 jours ouvrés selon votre banque."
        }
      ]
    },
    {
      title: "Contact et support",
      faqs: [
        {
          question: "Comment vous contacter ?",
          answer: "Par email à support@killcrave.com. Nous répondons sous 2 heures en semaine (9h-18h)."
        },
        {
          question: "Avez-vous un service client téléphonique ?",
          answer: "Pour le moment, notre support se fait uniquement par email pour garantir un suivi optimal de vos demandes."
        },
        {
          question: "Puis-je modifier ou annuler ma commande ?",
          answer: "Contactez-nous dans les 2 heures suivant votre commande. Passé ce délai, la commande est en préparation et ne peut plus être modifiée."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen" id="top">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8">Foire Aux Questions</h1>

          <p className="text-lg text-muted-foreground mb-10">
            Retrouvez toutes les réponses à vos questions sur Kill Crave, notre spray anti-envies de sucre.
          </p>

          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className={categoryIndex > 0 ? "mt-10" : ""}>
              <h2 className="text-xl font-semibold mb-4 text-primary">{category.title}</h2>
              <Accordion type="single" collapsible>
                {category.faqs.map((faq, faqIndex) => (
                  <AccordionItem value={`cat-${categoryIndex}-item-${faqIndex}`} key={faqIndex}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          <Card className="mt-12">
            <CardContent className="p-6 text-center">
              <h2 className="text-xl font-semibold mb-3 text-primary">Vous ne trouvez pas votre réponse ?</h2>
              <p className="text-muted-foreground mb-4">
                Notre équipe est là pour vous aider. N'hésitez pas à nous contacter !
              </p>
              <p className="text-lg">
                <a href="mailto:support@killcrave.com" className="text-primary hover:underline font-medium">
                  support@killcrave.com
                </a>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Réponse garantie sous 2 heures (jours ouvrés)
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;