# Bye Sweetie Design System

## Overview
This document outlines the consistent design system implemented for the Bye Sweetie website. All components follow these guidelines to ensure brand consistency and modern styling.

## Color Palette


### Primary Colors
- **Background**: `#FAF7E9` (warm cream) - Main site background
- **Secondary**: `#BCC499` (sage green) - Section backgrounds and accents
- **Tertiary**: `#FFE065` (yellow) - Buttons, highlights, and call-to-action elements
- **Text**: `#000000` (black) - All text content

### Usage Guidelines
- **Background (`#FAF7E9`)**: Use for main content areas, cards, and neutral backgrounds
- **Secondary (`#BCC499`)**: Use for alternating sections, secondary buttons, and subtle highlights
- **Tertiary (`#FFE065`)**: Use for primary buttons, important highlights, and interactive elements
- **Black**: Use for all text, headers, and high-contrast elements

## Typography

### Fonts
- **Logo**: Cyrillic Bodoni (via Bodoni Moda), lowercase, tracking-tight
- **Headers**: Work Sans, ALL CAPS, font-semibold, tracking-tight
- **Body Text**: Cyrillic Bodoni (via Bodoni Moda), leading-relaxed
- **UI Elements**: Work Sans for buttons, inputs, labels

### Hierarchy
- **H1**: `text-4xl sm:text-5xl lg:text-6xl` - Main page titles
- **H2**: `text-3xl sm:text-4xl lg:text-5xl` - Section titles  
- **H3**: `text-2xl sm:text-3xl` - Subsection titles
- **H4**: `text-xl sm:text-2xl` - Minor headings
- **Body**: `text-base` with `leading-relaxed` - Standard text
- **Lead**: `text-lg sm:text-xl` - Emphasis paragraphs

## Components

### Buttons
All buttons use the tertiary color (`#FFE065`) by default:

```tsx
// Primary button (default)
<Button variant="default">Text</Button>
// Uses: bg-tertiary text-tertiary-foreground

// Secondary button  
<Button variant="secondary">Text</Button>
// Uses: bg-secondary text-secondary-foreground

// Hero/Premium buttons for important CTAs
<Button variant="hero">Text</Button>
<Button variant="premium">Text</Button>
```

### Sections
- **Primary sections**: `py-20 sm:py-28 bg-background`
- **Secondary sections**: `py-20 sm:py-28 bg-secondary` 
- **Card sections**: `py-20 sm:py-28 bg-muted/40`

### Cards
- **Basic card**: `rounded-2xl border bg-card shadow-soft`
- **Interactive card**: Adds `hover:shadow-card hover:-translate-y-0.5 transition-all`

### Layout
- **Container**: `container mx-auto max-w-6xl px-4 sm:px-8`
- **Small container**: `container mx-auto max-w-4xl px-4 sm:px-8`

## Implementation

### CSS Variables (Tailwind)
The design system is implemented through CSS custom properties in `src/index.css`:

```css
:root {
  --background: 48 63% 95%;     /* #FAF7E9 */
  --secondary: 78 32% 69%;      /* #BCC499 */
  --tertiary: 48 100% 70%;      /* #FFE065 */
  --foreground: 0 0% 0%;        /* #000000 */
}
```

### Typography Components
Use the provided typography components for consistency:

```tsx
import { H1, H2, H3, Text, Lead } from "@/components/ui/typography";

// Headers automatically apply Work Sans + ALL CAPS
<H1>Main Title</H1>
<H2>Section Title</H2>

// Body text uses Cyrillic Bodoni
<Text>Regular paragraph text</Text>
<Lead>Emphasis paragraph text</Lead>
```

### Logo Usage
The logo component automatically applies Cyrillic Bodoni lowercase:

```tsx
import Logo from "@/components/Logo";

<Logo className="text-2xl sm:text-3xl" />
// Renders: "bye sweetie" in Cyrillic Bodoni
```

## Best Practices

### Color Usage
1. **Never hardcode colors** - Always use Tailwind color classes (bg-background, bg-secondary, bg-tertiary)
2. **Maintain contrast** - Black text on light backgrounds for readability
3. **Use tertiary sparingly** - Reserve yellow for important CTAs and highlights
4. **Section variety** - Alternate between background and secondary for visual interest

### Typography
1. **Headers are always uppercase** - Handled automatically by typography components
2. **Body text is always Cyrillic Bodoni** - Use serif classes
3. **UI elements use Work Sans** - Buttons, forms, navigation
4. **Maintain hierarchy** - Use appropriate heading levels

### Components
1. **Reuse button variants** - Don't create custom button styles
2. **Use provided spacing** - Stick to `py-20 sm:py-28` for sections
3. **Consistent rounded corners** - `rounded-2xl` for cards, `rounded-xl` for smaller elements
4. **Apply hover effects** - Use `transition-all` for smooth interactions

## Files Updated

### Core Styling
- `src/index.css` - Updated color variables and typography
- `tailwind.config.ts` - Added new color tokens
- `src/lib/design-tokens.ts` - Design system tokens and utilities

### Components
- `src/components/ui/button.tsx` - Updated to use tertiary color
- `src/components/ui/typography.tsx` - Added uppercase headers
- `src/components/Logo.tsx` - Uses Cyrillic Bodoni

### Page Components
All section components updated to use new color scheme:
- `HeroSection.tsx` - Secondary background, tertiary accents
- `PainSection.tsx` - Tertiary highlights
- `SolutionSection.tsx` - Secondary borders and accents
- `OfferSection.tsx` - Tertiary selection states
- `TestimonialsSection.tsx` - Tertiary hover states
- `ProofSection.tsx` - Simplified color usage
- `FAQSection.tsx` - Secondary background
- `FinalCTASection.tsx` - Secondary background

This design system ensures consistency, maintains brand identity, and provides a modern, clean aesthetic that represents the Bye Sweetie brand effectively.
