type LogoProps = {
  className?: string;
};

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <img
      src="/images/logo.png"
      alt="Kill Crave"
      className={`w-auto object-contain ${className}`}
    />
  );
};

export default Logo;
