const PainSection = () => {
  const painPoints = [
    {
      title: "Skin breakouts from sugar spikes",
      description: "I'm tired of my skin paying the price for every sweet craving. The cycle never ends.",
      icon: "😔"
    },
    {
      title: "That afternoon bloated feeling",
      description: "3pm hits and I feel like I swallowed a balloon. Why do I keep doing this to myself?",
      icon: "😵‍💫"
    },
    {
      title: "The 4pm energy crash",
      description: "Every day, same story. Sugar high, then I'm dragging myself through the rest of the day.",
      icon: "😴"
    }
  ];

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl lg:text-5xl font-light text-primary mb-6">
            Tired of sugar controlling you?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            You're not alone. Thousands of French women are breaking free from the sugar cycle.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {painPoints.map((point, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-accent-warm rounded-full flex items-center justify-center text-4xl mb-6 shadow-soft">
                {point.icon}
              </div>
              <h3 className="font-serif text-2xl font-medium text-primary">
                {point.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed italic">
                "{point.description}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainSection;