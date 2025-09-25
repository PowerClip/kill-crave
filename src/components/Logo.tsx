type LogoProps = {
  className?: string;
};

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <span
      className={`relative inline-flex flex-col items-center leading-none uppercase ${className}`}
      aria-label="Kill Crave"
    >
      <span className="absolute inset-0 -z-10 -rotate-[3deg] rounded-[38%_62%_44%_56%/48%_32%_68%_52%] bg-secondary shadow-hero" />
      <span className="font-logo text-primary drop-shadow-[0_4px_0_rgba(0,0,0,0.45)] tracking-[0.16em] text-[1.8rem] sm:text-[2.1rem]">
        KILL
      </span>
      <span className="font-logo text-primary drop-shadow-[0_4px_0_rgba(0,0,0,0.45)] tracking-[0.16em] text-[1.8rem] sm:text-[2.1rem] -mt-1">
        CRAVE
      </span>
    </span>
  );
};

export default Logo;
