import { useEffect, useState, ReactNode, HTMLAttributes } from "react";

const gradients = [
  {
    rgba: "rgba(241, 63, 56, 0.34)",
    position: "15% 10%",
    size: "1200px 900px",
  },
  {
    rgba: "rgba(241, 63, 56, 0.26)",
    position: "80% 85%",
    size: "1100px 850px",
  },
  {
    rgba: "rgba(241, 63, 56, 0.24)",
    position: "30% 90%",
    size: "1200px 900px",
  },
  {
    rgba: "rgba(241, 63, 56, 0.28)",
    position: "70% 15%",
    size: "1200px 900px",
  },
];

const darkLayers = [
  "linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.78) 100%)",
  "linear-gradient(160deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.75) 80%)",
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
    `${gradient ? `radial-gradient(${gradient.size} at ${gradient.position}, ${gradient.rgba}, transparent 65%)` : ""}`,
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
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 10%, rgba(0,0,0,0.8) 90%, rgba(0,0,0,0) 100%)",
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 10%, rgba(0,0,0,0.8) 90%, rgba(0,0,0,0) 100%)",
      }}
      {...rest}
    >
      <div className="absolute inset-0 backdrop-blur-[1.5px] bg-black/4 pointer-events-none" />
      <div className="relative z-[1]">
        {children}
      </div>
    </section>
  );
};

export default SectionGradient;
