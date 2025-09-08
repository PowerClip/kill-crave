import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Comment ça marche ?",
      answer: "Notre spray premium contient de l'extrait de Gymnema Sylvestre qui bloque temporairement les récepteurs du goût sucré sur votre langue. Vaporisez simplement avant les repas ou lorsque les envies surviennent. L'effet dure 30-60 minutes, vous aidant à perdre naturellement intérêt pour les aliments sucrés."
    },
    {
      question: "Combien de temps dure l'effet ?",
      answer: "Chaque bande fournit 30-60 minutes de blocage du goût sucré. Parfait pour traverser les envies de l'après-midi ou prévenir les excès de desserts après le dîner. L'effet s'estompe naturellement, sans laisser de goût résiduel."
    },
    {
      question: "Est-il sûr de l'utiliser quotidiennement ?",
      answer: "Absolument ! Le Gymnema Sylvestre est un extrait de plante naturel utilisé en toute sécurité dans les pratiques de bien-être traditionnelles depuis des siècles. Notre spray est testé par des tiers et ne contient aucun additif artificiel. Commencez par une fois par jour et ajustez selon vos besoins."
    },
    {
      question: "Quand verrai-je les résultats ?",
      answer: "De nombreux clients remarquent une réduction des envies immédiatement après la première utilisation. Pour la clarté de la peau et les améliorations énergétiques, la plupart rapportent des changements visibles dans les 7-14 jours d'utilisation cohérente dans le cadre du programme complet Bye Sweetie."
    },
    {
      question: "À quelle vitesse expédiez-vous ?",
      answer: "Nous expédions sous 24 heures depuis notre installation française. La plupart des commandes arrivent dans les 2-3 jours ouvrables avec livraison gratuite dans toute la France. Options express disponibles pour la livraison le lendemain."
    },
    {
      question: "Est-ce que ça tue tous les goûts ?",
      answer: "Non — juste la note sucrée. La texture et la base de saveur restent intactes."
    },
    {
      question: "Les envies disparaîtront-elles pour toujours ?",
      answer: "C'est un outil de moment de vérité, pas un remède définitif."
    },
    {
      question: "Est-ce que ça a un mauvais goût ?",
      answer: "Certains produits oui. Le nôtre se concentre sur une menthe propre et un agrume pour éviter les plaintes 'craie/métallique'."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-light text-primary mb-6">
              Des questions ? Nous avons les réponses
            </h2>
            <p className="text-xl text-muted-foreground">
              Tout ce que vous devez savoir sur votre programme Bye Sweetie
            </p>
          </div>

          <Accordion type="single" collapsible className="bg-background rounded-2xl border shadow-sm divide-y">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={faq.question} className="px-4 sm:px-6">
                <AccordionTrigger className="font-serif text-base sm:text-lg text-primary py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contact */}
          <div className="text-center mt-12 p-6 bg-accent-warm rounded-xl">
            <p className="text-primary mb-2">
              Vous avez encore des questions ?
            </p>
            <p className="text-muted-foreground">
              Envoyez-nous un email à <span className="font-medium text-primary">bonjour@byesweetie.com</span> — nous répondons sous 2 heures ✨
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;