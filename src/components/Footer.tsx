const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Bye Sweetie. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <a href="#faq" className="hover:text-primary">FAQ</a>
            <a href="#offer" className="hover:text-primary">Livraison</a>
            <a href="#" className="hover:text-primary">CGV</a>
            <a href="#" className="hover:text-primary">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
