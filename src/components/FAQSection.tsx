import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { H2, P } from "@/components/ui/typography";
import SectionGradient from "@/components/SectionGradient";

const FAQSection = () => {
  const faqs = [
    {
      question: "Comment fonctionne le spray ?",
      answer:
        "La plante Gymnema neutralise temporairement les récepteurs du goût sucré sur la langue. En 30–60 minutes, le sucré devient fade et l’envie retombe — sans ‘forcer’."
    },
    {
      question: "Comment l’utiliser au quotidien ?",
      answer:
        "1–2 pulvérisations avant les moments à risque (café de l’après‑midi, dessert, soirée). 90 doses = 30 jours à raison de 3 utilisations/jour."
    },
    {
      question: "Vais‑je encore sentir le reste des saveurs ?",
      answer:
        "Oui. Seule la note sucrée est atténuée. La texture, l’acide, l’amer et le salé restent."
    },
    {
      question: "Quand apparaissent les résultats ?",
      answer:
        "L’effet sur l’envie est immédiat. Pour une énergie plus stable et une peau plus nette, comptez 2–3 semaines d’usage régulier."
    },
    {
      question: "Est‑ce sûr ? Y a‑t‑il des contre‑indications ?",
      answer:
        "Formule à base de plante. Évitez en cas de grossesse, d’allaitement ou de traitement médical: demandez conseil à votre médecin."
    },
    {
      question: "Paiement & sécurité",
      answer:
        "Paiement sécurisé via Stripe. Le lien de paiement collecte l’adresse et limite la livraison à la France. Cartes acceptées (CB, Visa, Mastercard…)."
    },
    {
      question: "Livraison",
      answer:
        "Expédition sous 24h. Livraison gratuite en France en 3 à 5 jours ouvrés."
    },
    {
      question: "Et si je craque quand même ?",
      answer:
        "C’est un outil ‘pare‑envie’. Si vous mangez sucré, aucun souci: l’effet s’estompe naturellement après 30–60 minutes."
    },
    {
      question: "Retours & garantie",
      answer:
        "30 jours pour changer d’avis (produit non ouvert). Écrivez‑nous à support@killcrave.com — réponse sous 2h."
    }
  ];

  return (
    <SectionGradient id="faq" className="py-20 text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <H2 className="mb-6 font-normal font-serif text-white">Des questions ?</H2>
            <P className="text-xl text-white/70">
              Tout ce que vous devez savoir sur votre spray Kill Crave Blackout Sugar
            </P>
          </div>

          <Accordion type="single" collapsible className="bg-white/12 rounded-2xl border border-white/15 shadow-sm divide-y divide-white/10 backdrop-blur">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={faq.question} className="px-4 sm:px-6">
                <AccordionTrigger className="font-serif text-base sm:text-lg text-white py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-white/75">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contact */}
          <div className="text-center mt-12 p-6 bg-white/12 text-white rounded-xl border border-white/15 backdrop-blur">
            <p className="text-primary mb-2 uppercase tracking-[0.18em]">
              Vous avez encore des questions ?
            </p>
            <p className="text-white/75">
              Envoyez-nous un email à <span className="font-medium text-primary">support@killcrave.com</span> — réponse sous 2&nbsp;heures ✨
            </p>
          </div>
        </div>
      </div>
    </SectionGradient>
  );
};

export default FAQSection;
