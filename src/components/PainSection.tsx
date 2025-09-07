const PainSection = () => {
  const painPoints = [
    {
      title: "Skin breakouts from sugar spikes",
      description: "I'm tired of my skin paying the price for every sweet craving. The cycle never ends.",
      icon: "😔",
      author: "Marie, 28"
    },
    {
      title: "That afternoon bloated feeling",
      description: "3pm hits and I feel like I swallowed a balloon. Why do I keep doing this to myself?",
      icon: "😵‍💫",
      author: "Sophie, 32"
    },
    {
      title: "The 4pm energy crash",
      description: "Every day, same story. Sugar high, then I'm dragging myself through the rest of the day.",
      icon: "😴",
      author: "Camille, 26"
    }
  ];

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-8">
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <h2 className="font-serif text-5xl lg:text-6xl font-light text-primary mb-8 leading-tight">
            Tired of sugar
            <span className="block font-medium italic text-accent-peach">controlling you?</span>
          </h2>
          <p className="text-2xl text-muted-foreground leading-relaxed">
            You're not alone. Here's what French women tell us about their daily sugar struggle:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {painPoints.map((pain, index) => (
            <div key={index} className="text-center space-y-8 group">
              <div className="relative mx-auto w-full max-w-sm aspect-square bg-gradient-card rounded-3xl p-12 flex items-center justify-center shadow-card group-hover:shadow-hero transition-smooth border border-border/30">
                <div className="text-9xl filter grayscale group-hover:grayscale-0 transition-all duration-500">{pain.icon}</div>
                <div className="absolute inset-0 bg-gradient-to-t from-accent-warm/20 to-transparent rounded-3xl"></div>
              </div>
              
              <div className="space-y-5 px-4">
                <h3 className="font-serif text-3xl font-light text-primary tracking-wide">
                  {pain.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed italic font-light max-w-xs mx-auto">
                  "{pain.description}"
                </p>
                <p className="text-sm text-accent-peach font-medium">
                  — {pain.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainSection;