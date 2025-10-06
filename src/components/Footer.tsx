import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-black/10 bg-[#f1eae2] text-black">
      <div className="container mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-black/70">
          <p>© {new Date().getFullYear()} Kill Crave. Tous droits réservés.</p>
          <nav className="flex items-center gap-3 sm:gap-4 text-black/60">
            <Link to="/mentions-legales" className="hover:text-black">Mentions légales</Link>
            <span className="text-black/30">•</span>
            <Link to="/cgv" className="hover:text-black">CGV</Link>
            <span className="text-black/30">•</span>
            <Link to="/confidentialite" className="hover:text-black">Confidentialité</Link>
            <span className="text-black/30">•</span>
            <Link to="/cookies" className="hover:text-black">Cookies</Link>
            <span className="text-black/30">•</span>
            <Link to="/faq" className="hover:text-black">FAQ</Link>
            <span className="text-black/30">•</span>
            <Link to="/livraison" className="hover:text-black">Livraison</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
