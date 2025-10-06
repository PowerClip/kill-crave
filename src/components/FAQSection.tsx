import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { H2, P } from "@/components/ui/typography";

const FAQSection = () => {
  const faqs = [
    {
      question: "Comment fonctionne le spray ?",
      answer:
        "La plante Gymnema neutralise temporairement les récepteurs du goût sucré sur la langue. Pendant 30–60 minutes, le sucré devient fade et l’envie retombe — sans ‘forcer’."
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
    <section id="faq" className="relative py-20 overflow-hidden text-black">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#f1eae2]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/8 to-transparent" />
      </div>
      <div className="relative container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <H2 className="mb-6 font-normal font-serif text-black">Des questions ?</H2>
            <P className="text-xl text-black/70">
              Tout ce que vous devez savoir sur votre spray Kill Crave Blackout Sugar
            </P>
          </div>

          <Accordion type="single" collapsible className="bg-white/80 rounded-2xl border border-black/10 shadow-sm divide-y divide-black/10 backdrop-blur">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={faq.question} className="px-4 sm:px-6">
                <AccordionTrigger className="font-serif text-base sm:text-lg text-black py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-black/75">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contact */}
          <div className="text-center mt-12 p-6 bg-white/80 text-black rounded-xl border border-black/10 backdrop-blur">
            <p className="text-primary mb-2 uppercase tracking-[0.18em]">
              Vous avez encore des questions ?
            </p>
            <p className="text-black/75">
              Envoyez-nous un email à <span className="font-medium text-primary">support@killcrave.com</span> — réponse sous 2&nbsp;heures ✨
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
