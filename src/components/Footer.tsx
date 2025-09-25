import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/60 text-white">
      <div className="container mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-white/70">
          <p>© {new Date().getFullYear()} Kill Crave. Tous droits réservés.</p>
          <nav className="flex items-center gap-3 sm:gap-4 text-white/60">
            <Link to="/mentions-legales" className="hover:text-white">Mentions légales</Link>
            <span className="text-white/30">•</span>
            <Link to="/cgv" className="hover:text-white">CGV</Link>
            <span className="text-white/30">•</span>
            <Link to="/confidentialite" className="hover:text-white">Confidentialité</Link>
            <span className="text-white/30">•</span>
            <Link to="/cookies" className="hover:text-white">Cookies</Link>
            <span className="text-white/30">•</span>
            <Link to="/faq" className="hover:text-white">FAQ</Link>
            <span className="text-white/30">•</span>
            <Link to="/livraison" className="hover:text-white">Livraison</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
