import { useState } from "react";

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does it work?",
      answer: "Our premium mouth strips contain Gymnema Sylvestre extract that temporarily blocks sweet taste receptors on your tongue. Simply dissolve one strip before meals or when cravings hit. The effect lasts 30-60 minutes, helping you naturally lose interest in sweet foods."
    },
    {
      question: "How long does the effect last?",
      answer: "Each strip provides 30-60 minutes of sweet taste blocking. Perfect for getting through those afternoon cravings or preventing after-dinner dessert binges. The effect wears off naturally, leaving no lingering taste."
    },
    {
      question: "Is it safe to use daily?",
      answer: "Absolutely! Gymnema Sylvestre is a natural plant extract used safely in traditional wellness practices for centuries. Our strips are third-party tested and contain no artificial additives. Start with once daily and adjust based on your needs."
    },
    {
      question: "When will I see results?",
      answer: "Many customers notice reduced cravings immediately after the first use. For skin clarity and energy improvements, most report visible changes within 7-14 days of consistent use as part of the complete reset program."
    },
    {
      question: "How quickly do you ship?",
      answer: "We ship within 24 hours from our French facility. Most orders arrive within 2-3 business days with free shipping throughout France. Express options available for next-day delivery."
    }
  ];

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-light text-primary mb-6">
              Questions? We have answers
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about your taste reset journey
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
              Still have questions?
            </p>
            <p className="text-muted-foreground">
              Email us at <span className="font-medium text-primary">bonjour@tasteresetkit.com</span> — we respond within 2 hours ✨
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;