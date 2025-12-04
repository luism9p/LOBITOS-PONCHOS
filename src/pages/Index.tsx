import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { db } from '@/services/db';
import { toast } from 'sonner';
import { ProductCard } from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';
import { useLanguage } from "@/context/LanguageContext";

const Index = () => {
  const { t } = useLanguage();
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`Added ${product.name} to cart`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Background Image */}
          <img
            src="/fotos/fondo.png"
            alt="Lobitos Ponchos Hero"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6 animate-fade-in-up">
            {t('index.warm_refuge')}
          </h1>
          <p className="text-lg md:text-xl font-light mb-8 opacity-90 max-w-2xl mx-auto animate-fade-in-up delay-100">
            {t('index.hero_desc')}
          </p>
          <div className="animate-fade-in-up delay-200">
            <Link to="/shop">
              <Button size="lg" className="bg-white text-black hover:bg-stone-100 border-none rounded-none px-8 py-6 text-sm uppercase tracking-widest">
                {t('index.collection_btn')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-stone-900 mb-4">{t('index.our_ponchos')}</h2>
            <p className="text-stone-500">{t('index.choose_favorite')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Featured items */}
            {db.getProducts().slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop" className="inline-flex items-center text-sm uppercase tracking-widest border-b border-black pb-1 hover:text-stone-600 hover:border-stone-600 transition-colors">
              {t('index.see_all')} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-light mb-4">{t('index.join_community')}</h2>
          <p className="text-stone-500 mb-8">{t('index.newsletter_desc')}</p>
          <form
            action="https://formsubmit.co/da5ca453ab4bb5eea753b5e7954273eb"
            method="POST"
            className="flex flex-col sm:flex-row gap-4"
          >
            <input type="hidden" name="_subject" value="Nuevo Suscriptor Lobitos Ponchos" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value={window.location.origin} />
            <input
              type="email"
              name="email"
              required
              placeholder={t('index.email_placeholder')}
              className="flex-1 px-4 py-3 bg-white border border-stone-200 focus:outline-none focus:border-stone-900"
            />
            <Button className="bg-stone-900 text-white hover:bg-stone-800 rounded-none px-8 py-3">
              {t('index.subscribe_btn')}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Index;
