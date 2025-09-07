import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-2xl font-medium ring-offset-background transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/85 shadow-soft hover:shadow-card border border-primary/10",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-border bg-background/50 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-gradient-card text-primary hover:shadow-soft border border-border/50",
        ghost: "hover:bg-accent/50 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline font-serif",
        hero: "bg-gradient-premium text-primary font-serif font-medium tracking-wide hover:shadow-premium hover:scale-[1.02] transition-smooth border border-accent-lavender/20",
        premium: "bg-primary text-primary-foreground hover:bg-primary/85 shadow-card hover:shadow-hero font-serif tracking-wide border border-primary/10",
        soft: "bg-accent-warm/60 text-primary hover:bg-accent-peach/60 transition-smooth shadow-soft hover:shadow-card border border-accent-warm/30",
        elegant: "bg-gradient-accent text-primary font-serif hover:shadow-card hover:scale-[1.01] transition-smooth border border-accent-lavender/30",
      },
      size: {
        default: "h-12 px-8 py-3 text-base",
        sm: "h-10 rounded-xl px-5 text-sm",
        lg: "h-16 rounded-2xl px-12 text-lg",
        xl: "h-20 rounded-3xl px-16 text-xl",
        icon: "h-12 w-12 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
