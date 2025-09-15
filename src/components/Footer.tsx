import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Bye Sweetie. Tous droits réservés.</p>
          <nav className="flex items-center gap-3 sm:gap-4">
            <Link to="/mentions-legales" className="hover:text-primary">Mentions légales</Link>
            <span className="text-border">•</span>
            <Link to="/cgv" className="hover:text-primary">CGV</Link>
            <span className="text-border">•</span>
            <Link to="/confidentialite" className="hover:text-primary">Confidentialité</Link>
            <span className="text-border">•</span>
            <Link to="/cookies" className="hover:text-primary">Cookies</Link>
            <span className="text-border">•</span>
            <Link to="/faq" className="hover:text-primary">FAQ</Link>
            <span className="text-border">•</span>
            <Link to="/livraison" className="hover:text-primary">Livraison</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
