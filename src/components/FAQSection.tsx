import { useState } from "react";

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = [
    {
      question: "Comment ça marche ?",
      answer: "Nos bandes buccales premium contiennent de l'extrait de Gymnema Sylvestre qui bloque temporairement les récepteurs du goût sucré sur votre langue. Dissolvez simplement une bande avant les repas ou lorsque les envies surviennent. L'effet dure 30-60 minutes, vous aidant à perdre naturellement intérêt pour les aliments sucrés."
    },
    {
      question: "Combien de temps dure l'effet ?",
      answer: "Chaque bande fournit 30-60 minutes de blocage du goût sucré. Parfait pour traverser les envies de l'après-midi ou prévenir les excès de desserts après le dîner. L'effet s'estompe naturellement, sans laisser de goût résiduel."
    },
    {
      question: "Est-il sûr de l'utiliser quotidiennement ?",
      answer: "Absolument ! Le Gymnema Sylvestre est un extrait de plante naturel utilisé en toute sécurité dans les pratiques de bien-être traditionnelles depuis des siècles. Nos bandes sont testées par des tiers et ne contiennent aucun additif artificiel. Commencez par une fois par jour et ajustez selon vos besoins."
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
    <section className="py-20 bg-card">
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

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-background rounded-xl shadow-soft overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-accent-warm transition-colors duration-200"
                >
                  <h3 className="font-serif text-xl font-medium text-primary">
                    {faq.question}
                  </h3>
                  <div className={`transform transition-transform duration-200 ${
                    openFAQ === index ? 'rotate-45' : ''
                  }`}>
                    <div className="w-6 h-6 flex items-center justify-center">
                      <span className="text-2xl text-accent-peach">+</span>
                    </div>
                  </div>
                </button>
                
                {openFAQ === index && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

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