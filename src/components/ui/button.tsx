import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-2xl font-medium ring-offset-background transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-tertiary text-tertiary-foreground hover:opacity-90 shadow-soft hover:shadow-card border border-border",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-border bg-background/50 backdrop-blur-sm hover:bg-tertiary/30 hover:text-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:opacity-90 border border-border",
        ghost: "hover:bg-tertiary/20 hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline font-serif",
        hero: "bg-tertiary text-tertiary-foreground font-serif font-medium tracking-wide hover:opacity-90 hover:shadow-card hover:scale-[1.02] transition-smooth border border-border",
        premium: "bg-tertiary text-tertiary-foreground hover:opacity-90 shadow-card hover:shadow-hero font-serif tracking-wide border border-border",
        soft: "bg-tertiary/70 text-tertiary-foreground hover:bg-tertiary transition-smooth shadow-soft hover:shadow-card border border-border",
        elegant: "bg-tertiary text-tertiary-foreground font-serif hover:shadow-card hover:scale-[1.01] transition-smooth border border-border",
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
