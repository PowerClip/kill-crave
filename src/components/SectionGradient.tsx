import { ReactNode, HTMLAttributes } from "react";

interface SectionGradientProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

const SectionGradient = ({ children, className = "", style, ...rest }: SectionGradientProps) => {
  const combinedClassName = ["relative", "overflow-hidden", className].filter(Boolean).join(" ");

  return (
    <section
      className={combinedClassName}
      style={{ backgroundColor: "#f1eae2", ...style }}
      {...rest}
    >
      {children}
    </section>
  );
};

export default SectionGradient;
