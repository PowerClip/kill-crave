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
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl lg:text-5xl font-light text-primary mb-6">
            Real transformations,
            <span className="block font-medium">Real French women</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands who've already reset their relationship with sugar
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card rounded-2xl p-8 shadow-card hover:shadow-hero transition-shadow duration-300">
              <div className="mb-6">
                <div className="flex text-accent-peach text-xl mb-4">
                  ★★★★★
                </div>
                <p className="text-primary leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center text-primary font-serif font-medium">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-primary">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof */}
        <div className="text-center mt-16">
          <div className="flex justify-center items-center space-x-8 text-muted-foreground">
            <div className="text-center">
              <div className="font-serif text-3xl font-light text-primary">2,847</div>
              <div className="text-sm">French women transformed</div>
            </div>
            <div className="w-1 h-12 bg-border"></div>
            <div className="text-center">
              <div className="font-serif text-3xl font-light text-primary">4.9/5</div>
              <div className="text-sm">Average rating</div>
            </div>
            <div className="w-1 h-12 bg-border"></div>
            <div className="text-center">
              <div className="font-serif text-3xl font-light text-primary">94%</div>
              <div className="text-sm">Would recommend</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;