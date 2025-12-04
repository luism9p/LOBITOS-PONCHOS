import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">
              <span className="text-primary">PONTUS</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              {t('nav.features')}
            </button>
            <button
              onClick={() => scrollToSection("materials")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              {t('nav.materials')}
            </button>
            <Button
              onClick={() => scrollToSection("buy")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {t('nav.buy_now')}
            </Button>

            {/* Language Switcher */}
            <div className="flex items-center gap-2 border-l border-border/50 pl-6">
              <button
                onClick={() => setLanguage('es')}
                className={`text-sm font-medium transition-colors ${language === 'es' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
              >
                ES
              </button>
              <span className="text-muted-foreground/50">|</span>
              <button
                onClick={() => setLanguage('en')}
                className={`text-sm font-medium transition-colors ${language === 'en' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in-up">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("features")}
                className="text-foreground hover:text-primary transition-colors font-medium text-left px-2 py-2"
              >
                {t('nav.features')}
              </button>
              <button
                onClick={() => scrollToSection("materials")}
                className="text-foreground hover:text-primary transition-colors font-medium text-left px-2 py-2"
              >
                {t('nav.materials')}
              </button>
              <Button
                onClick={() => scrollToSection("buy")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
              >
                {t('nav.buy_now')}
              </Button>

              {/* Mobile Language Switcher */}
              <div className="flex items-center gap-4 px-2 py-2 border-t border-border/50 mt-2 pt-4">
                <span className="text-sm text-muted-foreground">Language:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLanguage('es')}
                    className={`text-sm font-medium transition-colors ${language === 'es' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                  >
                    ES
                  </button>
                  <span className="text-muted-foreground/50">|</span>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`text-sm font-medium transition-colors ${language === 'en' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                  >
                    EN
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
