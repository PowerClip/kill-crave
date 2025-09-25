export type Review = {
  n: 1 | 2 | 3 | 4 | 5;
  title: string;
  text: string;
  author: string;
  city: string;
  date: string;
};

// 62 avis "style Trustpilot". Les premiers sont longs selon la formule demandée,
// puis des avis plus courts et naturels. Alternance: poids/sucre, peau, énergie.
export const trustpilotReviews: Review[] = [
  // Longs et détaillés (poids / sucre)
  {
    n: 5,
    title: "Les grignotages ont enfin cessé",
    text:
      "Je grignotais du sucré dès 16h et le soir devant Netflix. J’avais essayé des cures de chrome, des chewing-gums sans sucre, une appli de jeûne… rien n’a tenu plus d’une semaine. Une amie au boulot m’en a parlé, puis je l’ai vu en pub Insta et j’ai craqué. Dès la première pulvérisation, l’envie sucrée a chuté, le goût du sucre ne me faisait plus envie. En 2 semaines, -2,3 kg, glycémie plus stable, et je finis enfin mes journées sans bataille mentale.",
    author: "Camille",
    city: "Paris",
    date: "Sept. 2025",
  },
  {
    n: 5,
    title: "Fini les pics de sucre après déjeuner",
    text:
      "Coup de barre vers 15h et envie de biscuits au bureau, c’était quotidien. J’ai tenté d’enchaîner les cafés, les barres protéinées, boire plus d’eau… sans succès. Je l’ai découvert via une influenceuse sur TikTok et des avis super positifs, alors j’ai essayé. Un spray avant le goûter et plus de pulsion: je ne tourne plus autour de la machine à snacks. -1,8 kg en 3 semaines, humeur plus stable.",
    author: "Sophie",
    city: "Lyon",
    date: "Sept. 2025",
  },
  {
    n: 4,
    title: "Contrôle des envies et portions réduites",
    text:
      "Je n’arrivais pas à m’arrêter au dessert, même sans faim. Journaling, applis de suivi… rien ne changeait l’envie. Je l’ai vu dans une story Instagram et une copine avait perdu 4 kg, donc j’ai tenté. Maintenant je goûte le dessert, mais en 3 bouchées ça me suffit. Les portions ont diminué naturellement, -1,2 kg en 10 jours.",
    author: "Inès",
    city: "Marseille",
    date: "Août 2025",
  },
  {
    n: 5,
    title: "La compulsion sucrée du soir a disparu",
    text:
      "À 22h c’était la compulsion: chocolat, céréales… J’ai essayé de remplacer par des fruits, la tisane, même me brosser les dents, je craquais quand même. Je l’ai vu en pub Insta avec un code promo d’une créatrice et j’ai tenté. Deux sprays et l’idée du sucre n’attire plus. Je dors mieux et j’ai déjà perdu 2 kg en un mois.",
    author: "Laura",
    city: "Bordeaux",
    date: "Août 2025",
  },
  {
    n: 5,
    title: "Réconciliation avec mon alimentation",
    text:
      "Régimes en yo-yo, frustration tous les jours. J’ai fait keto, WW, jeûne 16/8… et je compensais toujours par du sucré. Une amie nutritionniste était intriguée par la formule, j’ai tenté. Je mange normalement et je n’ai plus la tête prise par le sucre. -3,1 kg en 4 semaines, sans privation.",
    author: "Alicia",
    city: "Toulouse",
    date: "Août 2025",
  },
  // Longs et détaillés (peau)
  {
    n: 5,
    title: "Ma peau s’est calmée en 3 semaines",
    text:
      "Acné adulte inflammatoire qui flambait après le sucre. J’ai tenté probiotiques, sans gluten, crèmes dermato… peu d’effet durable. Je l’ai découvert via une revue YouTube et des commentaires sur la peau qui s’apaise. Comme je consomme moins de sucre parce que l’envie tombe, mes poussées ont diminué. Grain de peau plus lisse, rougeurs en baisse, je me maquille moins.",
    author: "Mélanie",
    city: "Nice",
    date: "Août 2025",
  },
  {
    n: 4,
    title: "Moins de sucre, moins d’imperfections",
    text:
      "Microkystes sur les joues, surtout quand je stressais et que je mangeais sucré. J’ai arrêté les laitages, fait du double nettoyage, rétinoïdes… résultats instables. Une copine esthéticienne et TikTok m’ont convaincue d’essayer. Je craque moins, ma peau est plus nette le matin. Pas magique, mais effet réel en 2 semaines.",
    author: "Nina",
    city: "Lille",
    date: "Juil. 2025",
  },
  {
    n: 5,
    title: "Teint plus lumineux sans effort",
    text:
      "Teint terne et petites inflammations après les pâtisseries. J’ai testé détox, compléments, arrêt total du sucre (tenu 5 jours…). Je l’ai vu sur Insta avec des témoignages peau, j’ai essayé. Deux sprays quand l’envie monte et j’oublie le dessert. Teint plus uniforme et moins de boutons hormonaux.",
    author: "Claire",
    city: "Nantes",
    date: "Juil. 2025",
  },
  // Longs et détaillés (énergie)
  {
    n: 5,
    title: "Énergie stable toute la journée",
    text:
      "J’étais en montagnes russes: sucre, euphorie, crash, re-sucre. Remplacer par des fruits secs ou plus de café empirait tout. Une collègue en télétravail m’en a parlé avec un code promo, j’ai tenté. Plus d’appels du sucre à 11h et 16h, concentration revenue. J’ai repris le sport le soir sans être vidée.",
    author: "Jade",
    city: "Rennes",
    date: "Juil. 2025",
  },
  {
    n: 5,
    title: "Moins de coups de barre, meilleur sommeil",
    text:
      "Je me réveillais la nuit avec une envie de grignoter. J’ai essayé de manger plus au dîner, la tisane, le magnésium… sans réel effet. Je l’ai vu en pub Insta avec des avis style Trustpilot et j’ai essayé. Je pulvérise après le repas quand l’envie arrive: en une minute ça retombe. Sommeil continu retrouvé et plus d’énergie le matin.",
    author: "Léa",
    city: "Grenoble",
    date: "Juin 2025",
  },
  {
    n: 4,
    title: "Productivité retrouvée au bureau",
    text:
      "Snack sucré toutes les 2h, impossible de rester focus. J’ai tenté la planification stricte, supprimer les snacks, je compensais ailleurs. Une collègue RH et un post LinkedIn m’ont décidé. Deux sprays et l’envie passe. 1 à 2 fois par jour max. Moins d’errance vers la cuisine, meilleur rendu.",
    author: "Manon",
    city: "Strasbourg",
    date: "Juin 2025",
  },
  // Longs et détaillés (mix)
  {
    n: 5,
    title: "Perte de poids douce et sans privation",
    text:
      "J’ai pris 6 kg en deux ans à force de grignotages sucrés. Rééquilibrage, coach en ligne… trop de contrôle, je lâchais. Recommandation d’une amie et TikTok m’ont fait essayer. J’oublie le sucre au quotidien, j’ai repris le pouvoir. -3,8 kg en 6 semaines, vêtements plus confortables, meilleure estime.",
    author: "Eva",
    city: "Montpellier",
    date: "Juin 2025",
  },
  {
    n: 5,
    title: "Relation apaisée avec la nourriture",
    text:
      "Je pensais au sucre toute la journée, avec la culpabilité qui va avec. Hypnose, suivis, supprimer le sucre… et retour en force à chaque fois. Une influenceuse bien-être et les avis d’amis m’ont convaincue. Je décide sans lutte. Ma peau s’apaise, énergie plus stable et 2 kg en moins en un mois.",
    author: "Anaïs",
    city: "Reims",
    date: "Mai 2025",
  },

  // Avis medium (34)
  { n: 5, title: "Plus d’envies à 16h", text: "Je prenais systématiquement un truc sucré au bureau. Deux sprays et l’envie retombe, je passe à autre chose. -1,2 kg en quinze jours sans me concentrer dessus.", author: "Ariane", city: "Paris", date: "Sept. 2025" },
  { n: 4, title: "Peau plus calme", text: "Je limite les pâtisseries sans me forcer et ma peau réagit moins. Teint plus uniforme au bout de 3 semaines.", author: "Maud", city: "Lyon", date: "Sept. 2025" },
  { n: 5, title: "Énergie lissée l’après-midi", text: "Finis les crashs après déjeuner. Je garde la tête claire jusqu’au soir et je n’ai plus besoin d’un café à 17h.", author: "Ilona", city: "Toulouse", date: "Sept. 2025" },
  { n: 5, title: "Portions naturelles, poids en baisse", text: "Je goûte, je savoure, et je m’arrête. La balance a commencé à bouger sans pression.", author: "Noa", city: "Bordeaux", date: "Sept. 2025" },
  { n: 4, title: "Moins de rougeurs", text: "Quand je craque moins sur le sucre, ma peau se voit tout de suite plus régulière. Ce spray m’aide à tenir sans me priver.", author: "Isabelle", city: "Nice", date: "Sept. 2025" },
  { n: 5, title: "Plus de coups de barre", text: "Je l’utilise après le déjeuner et en fin d’aprem. Je me sens stable, j’ai même repris le yoga le soir.", author: "Charlie", city: "Rennes", date: "Sept. 2025" },
  { n: 5, title: "Grignotage sous contrôle", text: "Avant c’était biscuits et chocolat après le boulot. Maintenant, 2 sprays et ça passe. -1,9 kg en trois semaines.", author: "Axelle", city: "Nantes", date: "Août 2025" },
  { n: 4, title: "Teint plus net", text: "Pas parfait mais clairement moins d’imperfections. Et comme je pense moins au sucre, c’est plus simple à tenir.", author: "Valentine", city: "Strasbourg", date: "Août 2025" },
  { n: 5, title: "Journées plus régulières", text: "Moins d’oscillations d’énergie, je reste focus. Je n’ai plus cette envie de m’endormir à 16h.", author: "Mélusine", city: "Grenoble", date: "Août 2025" },
  { n: 5, title: "Régime sans régime", text: "J’ai arrêté les plans compliqués. Ce spray m’aide à avoir moins envie, et mon poids redescend doucement.", author: "Gaia", city: "Lille", date: "Août 2025" },
  { n: 4, title: "Peau plus douce", text: "En limitant le sucre, je vois moins de microkystes. C’est progressif mais réel.", author: "Ambre", city: "Montpellier", date: "Août 2025" },
  { n: 5, title: "Moins de fatigue post-repas", text: "Je n’ai plus besoin de sucre pour me relancer. Le spray casse l’envie en une minute.", author: "Soline", city: "Dijon", date: "Août 2025" },
  { n: 5, title: "Desserts partagés, pas subis", text: "Je prends trois bouchées et je suis satisfaite. Avant, j’allais au bout sans faim.", author: "Romane", city: "Tours", date: "Août 2025" },
  { n: 4, title: "Moins d’inflammations", text: "Je remarque moins de poussées quand je limite les sucreries. Ce spray m’y aide vraiment.", author: "Sacha", city: "Le Havre", date: "Juil. 2025" },
  { n: 5, title: "Clarté mentale", text: "Fini l’effet brouillard de l’après-midi. Je boucle mes dossiers sans cogiter sucre.", author: "Naomi", city: "Rouen", date: "Juil. 2025" },
  { n: 5, title: "Appétit apaisé", text: "Je n’ai plus la tête prise par le sucre. Les repas sont plus simples et je grignote moins.", author: "Eléonore", city: "Reims", date: "Juil. 2025" },
  { n: 4, title: "Peau et digestion", text: "En réduisant mes craquages, j’ai moins de rougeurs et je digère mieux le soir.", author: "Livia", city: "Saint-Étienne", date: "Juil. 2025" },
  { n: 5, title: "Sommeil plus stable", text: "Moins de sucre tard = je dors d’une traite. Je me réveille avec plus d’énergie.", author: "Ilyana", city: "Besançon", date: "Juil. 2025" },
  { n: 5, title: "Kilos émotionnels en baisse", text: "Moins de craquages par stress. J’ai repris du contrôle sans me priver.", author: "Soraya", city: "Metz", date: "Juin 2025" },
  { n: 4, title: "Peau plus régulière", text: "Les petites poussées avant règles se calment. Je suis la première étonnée.", author: "Nola", city: "Angers", date: "Juin 2025" },
  { n: 5, title: "Moins de montagnes russes", text: "Je me sens stable entre les repas. Je n’ai plus ce besoin de sucre à 11h.", author: "Aya", city: "Pau", date: "Juin 2025" },
  { n: 5, title: "Fringales qui s’apaisent", text: "Je n’ai plus ce tiraillement vers le sucré. La balance reflète enfin mes efforts.", author: "Nour", city: "Versailles", date: "Juin 2025" },
  { n: 4, title: "Teint plus lumineux", text: "Dès que je réduis le sucre, ma peau me dit merci. Là, c’est plus facile de tenir.", author: "Tess", city: "Boulogne-Billancourt", date: "Juin 2025" },
  { n: 5, title: "Concentration retrouvée", text: "Je bosse sans penser au snack sucré. Je garde ce spray dans mon sac.", author: "Zélie", city: "Colmar", date: "Juin 2025" },
  { n: 5, title: "Tour de taille qui fond", text: "En arrêtant les grignotages, ma ceinture respire. Je ne vis pas ça comme un régime.", author: "Alya", city: "Brest", date: "Mai 2025" },
  { n: 4, title: "Peau moins réactive", text: "J’ai moins de rougeurs après les repas. Je continue sur cette lancée.", author: "Yuna", city: "Orléans", date: "Mai 2025" },
  { n: 5, title: "Après-midi sans crash", text: "Je n’ai plus besoin d’un chocolat pour tenir. La sensation d’urgence disparaît vite.", author: "Nelia", city: "Poitiers", date: "Mai 2025" },
  { n: 5, title: "Desserts mieux gérés", text: "Je choisis quand j’en ai envie, pas par automatisme. Et souvent j’oublie tout simplement.", author: "Rania", city: "Annecy", date: "Mai 2025" },
  { n: 4, title: "Grain de peau affiné", text: "Ce n’est pas radical, mais mon grain de peau est plus régulier depuis que j’ai moins d’envies.", author: "Camila", city: "Aix-en-Provence", date: "Avr. 2025" },
  { n: 5, title: "Énergie dispo pour le sport", text: "J’arrive à faire une séance le soir sans me sentir vidée. Je ne grignote plus par réflexe.", author: "Myriam", city: "Clermont-Ferrand", date: "Avr. 2025" },
  { n: 5, title: "Poids stable puis en baisse", text: "D’abord j’ai stabilisé, puis la courbe a commencé à descendre. Tout en douceur.", author: "Norah", city: "Mulhouse", date: "Avr. 2025" },
  { n: 4, title: "Teint moins terne", text: "En limitant les desserts, j’ai plus de glow. Le spray m’aide à oublier l’envie.", author: "Mimi", city: "Nîmes", date: "Avr. 2025" },
  { n: 5, title: "Pic de sucre neutralisé", text: "Je sens beaucoup moins l’appel du sucre après un repas copieux. Ça change mes après-midis.", author: "Daria", city: "Toulon", date: "Avr. 2025" },
  { n: 5, title: "Moins d’achats impulsifs", text: "Je passe la boulangerie sans rentrer. C’est la première fois que j’ai ce sentiment de liberté.", author: "Inaya", city: "Nancy", date: "Mars 2025" },
  { n: 4, title: "Peau plus nette au réveil", text: "Les matins, je vois vraiment la différence quand je n’ai pas craqué la veille.", author: "Giulia", city: "Caen", date: "Mars 2025" },
  { n: 5, title: "Tonicité en hausse", text: "Je me sens moins lourde l’après-midi, plus tonique. Les réunions passent plus vite.", author: "Louna", city: "Amiens", date: "Mars 2025" },

  // Avis plus courts et normaux (42 environ)
  { n: 5, title: "Efficace dès la 1re utilisation", text: "Envie de chocolat coupée net. J’ai pris un yaourt et c’était suffisant.", author: "Julie", city: "Paris", date: "Sept. 2025" },
  { n: 5, title: "Moins de sucre = peau plus nette", text: "Après 2 semaines, moins de boutons hormonaux.", author: "Clara", city: "Lyon", date: "Sept. 2025" },
  { n: 4, title: "Pratique dans le sac", text: "Deux sprays quand l’envie monte. Très utile en déplacement.", author: "Pauline", city: "Toulouse", date: "Sept. 2025" },
  { n: 5, title: "Adieu les goûters industriels", text: "Je n’achète plus de biscuits. -1,5 kg sans y penser.", author: "Élise", city: "Marseille", date: "Août 2025" },
  { n: 5, title: "Moins de coups de barre", text: "Après déjeuner je reste concentrée. Le spray m’aide vraiment.", author: "Hélène", city: "Bordeaux", date: "Août 2025" },
  { n: 4, title: "Bon goût mentholé", text: "Sensation fraîche, et l’envie sucrée diminue vite.", author: "Marion", city: "Nantes", date: "Août 2025" },
  { n: 5, title: "Poids qui redescend", text: "-2 kg en 3 semaines en arrêtant les grignotages.", author: "Aurore", city: "Lille", date: "Juil. 2025" },
  { n: 5, title: "Meilleure humeur", text: "Moins de pics de sucre, je me sens stable toute la journée.", author: "Sarah", city: "Rennes", date: "Juil. 2025" },
  { n: 4, title: "Aide à dire non", text: "Au resto, je partage le dessert au lieu d’en prendre un entier.", author: "Ophélie", city: "Nice", date: "Juil. 2025" },
  { n: 5, title: "Peau plus lumineuse", text: "Teint plus net après 3 semaines. Je recommande.", author: "Noémie", city: "Strasbourg", date: "Juin 2025" },
  { n: 5, title: "Stop aux fringales", text: "Deux sprays et l’envie passe. Simple et efficace.", author: "Laura", city: "Grenoble", date: "Juin 2025" },
  { n: 4, title: "Utile au bureau", text: "Je n’ouvre plus le tiroir à bonbons…", author: "Amélie", city: "Dijon", date: "Juin 2025" },
  { n: 5, title: "Énergie stable", text: "Plus de crash à 16h. C’est devenu un réflexe.", author: "Lina", city: "Rouen", date: "Juin 2025" },
  { n: 5, title: "Moins de sucre, mieux dormir", text: "Je grignote moins le soir et je dors mieux.", author: "Marine", city: "Le Havre", date: "Juin 2025" },
  { n: 4, title: "Marche pour moi", text: "Pas miraculeux mais l’envie baisse clairement.", author: "Sana", city: "Metz", date: "Mai 2025" },
  { n: 5, title: "Perte de 3 kg", text: "Sans régime, juste moins de sucre. Ravie.", author: "Eva", city: "Reims", date: "Mai 2025" },
  { n: 5, title: "Plus de contrôle", text: "Je décide, je ne subis plus. Quel soulagement.", author: "Maya", city: "Montpellier", date: "Mai 2025" },
  { n: 4, title: "Aide précieuse", text: "Quand l’envie monte, 2 sprays et je passe à autre chose.", author: "Tara", city: "Clermont-Ferrand", date: "Mai 2025" },
  { n: 5, title: "Snack sucré remplacé", text: "Je prends un yaourt ou une pomme, ça me suffit.", author: "Zoe", city: "Aix-en-Provence", date: "Mai 2025" },
  { n: 5, title: "Teint plus régulier", text: "Moins d’inflammations depuis que je craque moins.", author: "Lucie", city: "Nancy", date: "Mai 2025" },
  { n: 4, title: "Facile à utiliser", text: "Format poche, je l’ai toujours sur moi.", author: "Nora", city: "Tours", date: "Avr. 2025" },
  { n: 5, title: "Bye cravings", text: "Le sucré m’attire moins. Je me sens libre.", author: "Léonie", city: "Toulon", date: "Avr. 2025" },
  { n: 5, title: "Routines simplifiées", text: "Plus besoin de stratégies compliquées, juste 2 sprays.", author: "Amandine", city: "Angers", date: "Avr. 2025" },
  { n: 4, title: "Goût ok", text: "Petit effet menthe, et surtout efficacité.", author: "Chloé", city: "Nîmes", date: "Avr. 2025" },
  { n: 5, title: "Grignotage du soir maîtrisé", text: "Je lis au lieu d’ouvrir le placard.", author: "Elea", city: "Mulhouse", date: "Avr. 2025" },
  { n: 4, title: "Bon soutien", text: "Je garde mes habitudes mais je craque moins souvent.", author: "Maëlle", city: "Perpignan", date: "Mars 2025" },
  { n: 5, title: "Peau + confiance", text: "Moins d’imperfections, j’ose sortir sans fond de teint.", author: "Yasmine", city: "Besançon", date: "Mars 2025" },
  { n: 5, title: "Sensation de liberté", text: "Je pense moins au sucre, c’est fou.", author: "Léna", city: "Orléans", date: "Mars 2025" },
  { n: 4, title: "Bien pour les apéros", text: "J’évite les gâteaux apéro sucrés sans frustration.", author: "Camille", city: "Poitiers", date: "Mars 2025" },
  { n: 5, title: "Sport facilité", text: "Énergie plus stable, je m’entraîne le soir.", author: "Adèle", city: "Annecy", date: "Mars 2025" },
  { n: 5, title: "Moins d’hypoglycémies", text: "Plus de tremblements en fin de matinée.", author: "Isa", city: "Pau", date: "Mars 2025" },
  { n: 4, title: "Convaincue", text: "Ce n’est pas un gadget, ça m’aide vraiment.", author: "Caro", city: "Saint-Étienne", date: "Fév. 2025" },
  { n: 5, title: "Simple et utile", text: "Deux pressions, et j’oublie le dessert.", author: "Mimi", city: "Versailles", date: "Fév. 2025" },
  { n: 5, title: "Meilleure digestion", text: "Moins de sucre tard, je dors mieux.", author: "Nina", city: "Boulogne-Billancourt", date: "Fév. 2025" },
  { n: 4, title: "Bon compagnon de sac", text: "Discret, rapide, efficace.", author: "Violette", city: "Colmar", date: "Fév. 2025" },
  { n: 5, title: "Motivation retrouvée", text: "La balance redescend sans effort violent.", author: "Iris", city: "Brest", date: "Fév. 2025" },
  { n: 5, title: "Moins de pulsions", text: "Je passe devant la boulangerie sans y penser.", author: "Salomé", city: "Grenoble", date: "Jan. 2025" },
  { n: 4, title: "Aide douce", text: "Pas de culpabilité, juste moins d’envie.", author: "Aïcha", city: "Clermont-Ferrand", date: "Jan. 2025" },
  { n: 5, title: "Top après déjeuner", text: "Je reste alerte l’après-midi.", author: "Emma", city: "Lyon", date: "Jan. 2025" },
  { n: 5, title: "Peau qui se régule", text: "Rougeurs apaisées en 3 semaines.", author: "Lola", city: "Paris", date: "Jan. 2025" },
  { n: 4, title: "Bon rapport utilité", text: "Je l’utilise 1 à 2 fois/jour, ça suffit.", author: "Nour", city: "Rouen", date: "Déc. 2024" },
  { n: 5, title: "Objectif atteint", text: "Moins 2 tailles de pantalon en 2 mois.", author: "Ava", city: "Reims", date: "Déc. 2024" },
  { n: 5, title: "Routine bien-être", text: "Moins de sucre, plus d’énergie.", author: "Morgane", city: "Toulouse", date: "Déc. 2024" },
  { n: 4, title: "Utile en soirée", text: "Je profite sans excès sucrés.", author: "Diane", city: "Bordeaux", date: "Déc. 2024" },
  { n: 5, title: "Véritable déclic", text: "Je n’avais jamais réussi à arrêter les snacks avant.", author: "Océane", city: "Nantes", date: "Nov. 2024" },
  { n: 5, title: "Moins de stress alimentaire", text: "Je n’anticipe plus les craquages.", author: "Aline", city: "Marseille", date: "Nov. 2024" },
  { n: 4, title: "Bon soutien peau", text: "Moins d’inflammations quand je limite le sucre.", author: "Sofia", city: "Nice", date: "Nov. 2024" },
  { n: 5, title: "Energie lissée", text: "Journées plus régulières, moins de crash.", author: "Ilyana", city: "Lille", date: "Nov. 2024" },
  { n: 5, title: "Rassasiée plus vite", text: "Je goûte et je m’arrête naturellement.", author: "Roxane", city: "Strasbourg", date: "Oct. 2024" },
  { n: 4, title: "Le bon outil", text: "Ce n’est pas un régime, c’est une aide concrète.", author: "Nadia", city: "Rennes", date: "Oct. 2024" },
  { n: 5, title: "Grignotage réglé", text: "Finis les biscuits à 16h.", author: "Agnès", city: "Lyon", date: "Oct. 2024" },
  { n: 5, title: "Peau + glow", text: "Teint plus lumineux en limitant le sucre.", author: "Justine", city: "Paris", date: "Oct. 2024" },
  { n: 4, title: "Aide vraie", text: "Je ne culpabilise plus, je choisis.", author: "Fanny", city: "Bordeaux", date: "Sept. 2024" },
  { n: 5, title: "Kill Crave adopté", text: "Toujours dans mon sac pour les urgences sucre.", author: "Gaëlle", city: "Nantes", date: "Sept. 2024" },
  { n: 5, title: "Sommeil apaisé", text: "Moins de snacks la nuit = nuits complètes.", author: "Aurore", city: "Marseille", date: "Sept. 2024" },
  { n: 4, title: "Focus au travail", text: "Moins d’allers-retours cuisine.", author: "Camille", city: "Toulouse", date: "Sept. 2024" },
  { n: 5, title: "Résultats concrets", text: "Je mange plus équilibré sans forcer.", author: "Ana", city: "Nice", date: "Août 2024" },
  { n: 5, title: "Peau et énergie", text: "Deux bénéfices en un, j’adore.", author: "Elisa", city: "Lille", date: "Août 2024" },
  { n: 4, title: "Discret", text: "Ni vu ni connu, je gère mes envies.", author: "Rita", city: "Strasbourg", date: "Août 2024" },
  { n: 5, title: "Plus d'équilibre", text: "Je n’oscille plus entre privation et craquage.", author: "Nina", city: "Grenoble", date: "Août 2024" },
];

export default trustpilotReviews;
