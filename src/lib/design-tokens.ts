/**
 * Kill Crave Design System
 * Consistent styling tokens for the brand
 */

export const designTokens = {
  // Brand Colors
  colors: {
    background: '#F4E8DC',
    primary: '#F13F38',
    secondary: '#0D0D0D',
    accent: '#1F1F1F',
    text: '#141416',
  },
  
  // Typography
  typography: {
    // Logo: Permanent Marker, uppercase
    logo: 'font-logo uppercase tracking-[0.18em] text-primary drop-shadow-[0_4px_0_rgba(0,0,0,0.45)]',

    // Headers: Bebas Neue, uppercase
    heading: 'font-heading tracking-[0.16em] uppercase text-foreground',
    h1: 'font-heading text-4xl sm:text-5xl lg:text-6xl tracking-[0.18em] uppercase',
    h2: 'font-heading text-3xl sm:text-4xl lg:text-5xl tracking-[0.16em] uppercase',
    h3: 'font-heading text-2xl sm:text-3xl tracking-[0.14em] uppercase',
    h4: 'font-heading text-xl sm:text-2xl tracking-[0.14em] uppercase',

    // Body: Inter
    body: 'font-sans leading-relaxed text-foreground',
    lead: 'font-sans text-lg sm:text-xl leading-relaxed font-medium text-foreground/90',
    small: 'font-sans text-xs text-muted-foreground',
  },
  
  // Components
  components: {
    // Buttons use tertiary color (#FFE065)
    button: {
      primary: 'bg-secondary text-white hover:bg-secondary/90 shadow-soft border border-secondary/80',
      secondary: 'bg-primary text-white hover:bg-primary/90 shadow-card border border-primary/70',
      outline: 'border border-secondary/40 bg-transparent text-secondary hover:bg-secondary/10',
    },
    
    // Cards
    card: 'rounded-2xl border bg-card text-card-foreground shadow-soft',
    cardHover: 'hover:shadow-card hover:-translate-y-0.5 transition-all',
    
    // Sections
    section: 'py-20 sm:py-28',
    sectionSecondary: 'py-20 sm:py-28 bg-secondary', // Uses sage green
    sectionCard: 'py-20 sm:py-28 bg-muted/40',
  },
  
  // Spacing & Layout
  layout: {
    container: 'container mx-auto max-w-6xl px-4 sm:px-8',
    containerSmall: 'container mx-auto max-w-4xl px-4 sm:px-8',
    spacing: 'space-y-6',
    spacingLarge: 'space-y-8',
  },
  
  // Interactions
  interactions: {
    transition: 'transition-smooth',
    hover: 'hover:scale-[1.02]',
    focus: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
  }
} as const;

// Helper functions for consistent styling
export const cx = {
  // Section backgrounds
  sectionPrimary: () => designTokens.components.section,
  sectionSecondary: () => designTokens.components.sectionSecondary,
  sectionCard: () => designTokens.components.sectionCard,
  
  // Typography
  logo: (size = 'text-2xl') => `${designTokens.typography.logo} ${size}`,
  h1: (additionalClasses = '') => `${designTokens.typography.h1} ${additionalClasses}`,
  h2: (additionalClasses = '') => `${designTokens.typography.h2} ${additionalClasses}`,
  h3: (additionalClasses = '') => `${designTokens.typography.h3} ${additionalClasses}`,
  body: (additionalClasses = '') => `${designTokens.typography.body} ${additionalClasses}`,
  lead: (additionalClasses = '') => `${designTokens.typography.lead} ${additionalClasses}`,
  
  // Buttons
  buttonPrimary: (size = 'h-12 px-8 py-3') => `${designTokens.components.button.primary} ${size} rounded-2xl font-medium ${designTokens.interactions.transition}`,
  buttonSecondary: (size = 'h-12 px-8 py-3') => `${designTokens.components.button.secondary} ${size} rounded-2xl font-medium ${designTokens.interactions.transition}`,
  
  // Cards
  card: (additionalClasses = '') => `${designTokens.components.card} ${additionalClasses}`,
  cardInteractive: (additionalClasses = '') => `${designTokens.components.card} ${designTokens.components.cardHover} ${additionalClasses}`,
  
  // Layout
  container: () => designTokens.layout.container,
  containerSmall: () => designTokens.layout.containerSmall,
};

export default designTokens;
