import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-2xl font-medium ring-offset-background transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground hover:bg-secondary/90 border border-secondary/80 shadow-soft",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-secondary/30 bg-transparent text-secondary hover:bg-secondary/10",
        secondary: "bg-primary text-primary-foreground hover:bg-primary/90 border border-primary/80 shadow-soft",
        ghost: "hover:bg-secondary/10 hover:text-secondary",
        link: "text-primary underline-offset-4 hover:underline font-heading",
        hero: "bg-tertiary text-tertiary-foreground font-heading tracking-[0.2em] text-sm hover:bg-tertiary/90 hover:shadow-card hover:-translate-y-[2px] transition-smooth border border-tertiary/70",
        premium: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-hero font-heading tracking-[0.2em] border border-secondary",
        soft: "bg-tertiary/85 text-tertiary-foreground hover:bg-tertiary transition-smooth shadow-soft border border-tertiary/60",
        elegant: "bg-transparent text-secondary border border-secondary/60 hover:bg-secondary hover:text-secondary-foreground transition-smooth",
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
