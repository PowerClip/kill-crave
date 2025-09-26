import { useEffect, useState, ReactNode, HTMLAttributes } from "react";

const gradients = [
  {
    rgba: "rgba(241, 63, 56, 0.09)",
    position: "15% 10%",
    size: "1200px 900px",
  },
  {
    rgba: "rgba(240, 60, 54, 0.08)",
    position: "80% 85%",
    size: "1200px 880px",
  },
  {
    rgba: "rgba(245, 76, 68, 0.07)",
    position: "32% 88%",
    size: "1300px 950px",
  },
  {
    rgba: "rgba(229, 54, 48, 0.085)",
    position: "68% 18%",
    size: "1250px 920px",
  },
];

const darkLayers = [
  "linear-gradient(180deg, rgba(0, 0, 0, 0.03) 0%, rgba(0, 0, 0, 0.16) 100%)",
  "linear-gradient(160deg, rgba(0, 0, 0, 0.025) 0%, rgba(0, 0, 0, 0.14) 80%)",
];

interface SectionGradientProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

const SectionGradient = ({ children, className = "", ...rest }: SectionGradientProps) => {
  const [gradientStyles, setGradientStyles] = useState({
    gradient: gradients[0],
    darkLayer: darkLayers[0],
  });

  useEffect(() => {
    const gradient = gradients[Math.floor(Math.random() * gradients.length)];
    const darkLayer = darkLayers[Math.floor(Math.random() * darkLayers.length)];
    setGradientStyles({ gradient, darkLayer });
  }, []);

  const { gradient, darkLayer } = gradientStyles;

  const backgroundImage = [
    `${gradient ? `radial-gradient(${gradient.size} at ${gradient.position}, ${gradient.rgba}, transparent 70%)` : ""}`,
    darkLayer,
  ].filter(Boolean).join(", ");

  return (
    <section
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundImage,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 88%, rgba(0,0,0,0) 100%)",
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 88%, rgba(0,0,0,0) 100%)",
      }}
      {...rest}
    >
      <div className="absolute inset-0 backdrop-blur-[0.3px] bg-black/5 pointer-events-none" />
      <div className="relative z-[1]">
        {children}
      </div>
    </section>
  );
};

export default SectionGradient;
