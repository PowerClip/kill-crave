type LogoProps = {
  className?: string;
};

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <span className={`font-logo lowercase tracking-tight leading-none ${className}`}>
      bye sweetie
    </span>
  );
};

export default Logo;

