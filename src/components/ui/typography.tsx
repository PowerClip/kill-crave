import * as React from "react";
import { cn } from "@/lib/utils";

type ElementProps<T extends HTMLElement> = React.HTMLAttributes<T> & { className?: string };

export const H1 = React.forwardRef<HTMLHeadingElement, ElementProps<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn(
        "font-heading text-4xl sm:text-5xl lg:text-6xl tracking-[0.18em] text-secondary uppercase",
        className,
      )}
      {...props}
    />
  ),
);
H1.displayName = "H1";

export const H2 = React.forwardRef<HTMLHeadingElement, ElementProps<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn("font-heading text-3xl sm:text-4xl lg:text-5xl tracking-[0.16em] text-secondary uppercase", className)}
      {...props}
    />
  ),
);
H2.displayName = "H2";

export const H3 = React.forwardRef<HTMLHeadingElement, ElementProps<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("font-heading text-2xl sm:text-3xl tracking-[0.14em] text-secondary uppercase", className)} {...props} />
  ),
);
H3.displayName = "H3";

export const H4 = React.forwardRef<HTMLHeadingElement, ElementProps<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h4 ref={ref} className={cn("font-heading text-xl sm:text-2xl tracking-[0.14em] text-secondary uppercase", className)} {...props} />
  ),
);
H4.displayName = "H4";

export const P = React.forwardRef<HTMLParagraphElement, ElementProps<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("font-sans text-base sm:text-lg text-foreground leading-relaxed", className)} {...props} />
  ),
);
P.displayName = "P";

export const Lead = React.forwardRef<HTMLParagraphElement, ElementProps<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("font-sans text-lg sm:text-xl text-muted-foreground leading-relaxed", className)} {...props} />
  ),
);
Lead.displayName = "Lead";

export const Small = React.forwardRef<HTMLSpanElement, ElementProps<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <small ref={ref as any} className={cn("font-sans text-sm text-muted-foreground", className)} {...props} />
  ),
);
Small.displayName = "Small";

export const Muted = React.forwardRef<HTMLParagraphElement, ElementProps<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("font-sans text-base sm:text-lg text-muted-foreground", className)} {...props} />
  ),
);
Muted.displayName = "Muted";
