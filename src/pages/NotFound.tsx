import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { H1, P } from "@/components/ui/typography";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center text-foreground">
        <H1 className="mb-4 text-4xl">404</H1>
        <P className="mb-4 text-xl">Oops! Page not found</P>
        <a href="/" className="underline hover:opacity-80 text-foreground">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
