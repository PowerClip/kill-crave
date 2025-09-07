const PainSection = () => {
  const painPoints = [
    {
      title: "Éruptions cutanées dues aux pics de sucre",
      description: "J'en ai marre que ma peau paie le prix de chaque envie sucrée. Le cycle ne s'arrête jamais.",
      icon: "😔",
      author: "Marie, 28"
    },
    {
      title: "Cette sensation de ballonnement l'après-midi",
      description: "15h arrive et j'ai l'impression d'avoir avalé un ballon. Pourquoi est-ce que je continue à me faire ça ?",
      icon: "😵‍💫",
      author: "Sophie, 32"
    },
    {
      title: "Le coup de fatigue de 16h",
      description: "Tous les jours, même histoire. Pic de sucre, puis je traîne le reste de la journée.",
      icon: "😴",
      author: "Camille, 26"
    }
  ];

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-8">
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <h2 className="font-serif text-5xl lg:text-6xl font-light text-primary mb-8 leading-tight">
            Fatiguée du sucre
            <span className="block font-medium italic text-accent-peach">qui vous contrôle ?</span>
          </h2>
          <p className="text-2xl text-muted-foreground leading-relaxed">
            Vous n'êtes pas seule. Voici ce que les Françaises nous disent sur leur lutte quotidienne contre le sucre — et comment elles tuent le moment "j'ai besoin de quelque chose de sucré".
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