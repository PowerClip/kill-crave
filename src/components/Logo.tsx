type LogoProps = {
  className?: string;
};

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <span
      className={`font-logo tracking-tight leading-none text-[1.9rem] sm:text-[2.05rem] font-medium ${className}`}
    >
      bye sweetie
    </span>
  );
};

export default Logo;
