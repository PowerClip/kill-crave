/**
 * Bye Sweetie Design System
 * Consistent styling tokens for the brand
 */

export const designTokens = {
  // Brand Colors
  colors: {
    background: '#FAF7E9', // Warm cream background
    secondary: '#BCC499', // Sage green for sections
    tertiary: '#FFE065', // Yellow for buttons and highlights
    text: '#000000', // Black text
  },
  
  // Typography
  typography: {
    // Logo: Cyrillic Bodoni, lowercase
    logo: 'font-logo lowercase tracking-tight leading-none',
    
    // Headers: Work Sans, All Caps
    heading: 'font-sans font-semibold tracking-tight uppercase text-foreground',
    h1: 'font-sans text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight uppercase',
    h2: 'font-sans text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight uppercase',
    h3: 'font-sans text-2xl sm:text-3xl font-medium tracking-tight uppercase',
    h4: 'font-sans text-xl sm:text-2xl font-medium tracking-tight uppercase',
    
    // Body: Cyrillic Bodoni
    body: 'font-serif leading-relaxed text-foreground',
    lead: 'font-serif text-lg sm:text-xl leading-relaxed font-medium',
    small: 'font-serif text-xs text-muted-foreground',
  },
  
  // Components
  components: {
    // Buttons use tertiary color (#FFE065)
    button: {
      primary: 'bg-tertiary text-tertiary-foreground hover:opacity-90 shadow-soft hover:shadow-card border border-border',
      secondary: 'bg-secondary text-secondary-foreground hover:opacity-90 border border-border',
      outline: 'border border-border bg-background/50 backdrop-blur-sm hover:bg-tertiary/30',
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
