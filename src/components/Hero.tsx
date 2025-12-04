import { Button } from "@/components/ui/button";
import PonchosImage from "@/assets/Ponchos-product.png";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const Hero = () => {
  const { t } = useLanguage();
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-sand-light via-background to-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-ocean-light/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 opacity-0 animate-fade-in-up">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-sm font-medium text-primary">{t('hero.subtitle')}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="block text-foreground">{t('hero.title_1')}</span>
              <span className="block text-primary">{t('hero.title_2')}</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              {t('hero.description')}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold group"
                onClick={() => scrollToSection("buy")}
              >
                {t('hero.shop_now')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg"
                onClick={() => scrollToSection("features")}
              >
                {t('hero.learn_more')}
              </Button>
            </div>
          </div>

          {/* Product Showcase with 3D effect */}
          <div className="relative perspective-1000 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl group-hover:blur-2xl transition-all duration-500 animate-pulse" />

              {/* Product image with 3D hover effect */}
              <div className="relative transform transition-all duration-700 hover:scale-105 hover:rotate-y-12">
                <div className="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
                  <img
                    src={PonchosImage}
                    alt="Premium Surf Changing Ponchos"
                    className="w-full h-auto object-contain drop-shadow-2xl transform transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-6 py-3 rounded-full shadow-lg animate-float font-semibold">
                {t('hero.badge_premium')}
              </div>
              <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg animate-float font-semibold" style={{ animationDelay: "2s" }}>
                {t('hero.badge_fast_dry')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};
