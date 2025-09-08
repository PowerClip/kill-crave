const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Bye Sweetie. Tous droits réservés.</p>
          <nav className="flex items-center gap-3 sm:gap-4">
            <a href="#" className="hover:text-primary">Mentions légales</a>
            <span className="text-border">•</span>
            <a href="#" className="hover:text-primary">CGV</a>
            <span className="text-border">•</span>
            <a href="#" className="hover:text-primary">Confidentialité</a>
            <span className="text-border">•</span>
            <a href="#" className="hover:text-primary">Cookies</a>
            <span className="text-border">•</span>
            <a href="#faq" className="hover:text-primary">FAQ</a>
            <span className="text-border">•</span>
            <a href="#offer" className="hover:text-primary">Livraison</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
