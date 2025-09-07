const TestimonialsSection = () => {
  const testimonials = [
    {
      text: "Day 7 and my skin is glowing. I can actually see the difference in photos!",
      author: "Marie, 28",
      location: "Paris"
    },
    {
      text: "Chocolate literally tasted like cardboard — cravings gone. This is magic.",
      author: "Sophie, 32", 
      location: "Lyon"
    },
    {
      text: "Best impulse buy I've made this year. Already ordered 3 more kits for friends.",
      author: "Camille, 26",
      location: "Marseille"
    }
  ];

  return (
    <section className="py-32 bg-gradient-hero">
      <div className="container mx-auto px-8">
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <h2 className="font-serif text-5xl lg:text-6xl font-light text-primary mb-8 leading-tight">
            Real transformations,
            <span className="block font-medium italic text-accent-peach">Real French women</span>
          </h2>
          <p className="text-2xl text-muted-foreground font-light leading-relaxed">
            Join thousands who've already reset their relationship with sugar
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card rounded-3xl p-10 shadow-card hover:shadow-hero transition-smooth border border-accent-lavender/20 group">
              <div className="mb-8 space-y-6">
                <div className="flex text-accent-peach text-2xl mb-6">
                  ★★★★★
                </div>
                <p className="text-lg text-primary leading-relaxed italic font-light">
                  "{testimonial.text}"
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-premium rounded-full flex items-center justify-center text-primary font-serif font-medium text-xl shadow-soft">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="font-serif text-lg font-medium text-primary">{testimonial.author}</p>
                  <p className="text-sm text-accent-peach">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof */}
        <div className="text-center mt-24">
          <div className="flex justify-center items-center space-x-12 text-muted-foreground max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="font-serif text-4xl font-light text-primary mb-2 group-hover:text-accent-peach transition-smooth">2,847</div>
              <div className="text-base">French women transformed</div>
            </div>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-border to-transparent"></div>
            <div className="text-center group">
              <div className="font-serif text-4xl font-light text-primary mb-2 group-hover:text-accent-peach transition-smooth">4.9/5</div>
              <div className="text-base">Average rating</div>
            </div>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-border to-transparent"></div>
            <div className="text-center group">
              <div className="font-serif text-4xl font-light text-primary mb-2 group-hover:text-accent-peach transition-smooth">94%</div>
              <div className="text-base">Would recommend</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;