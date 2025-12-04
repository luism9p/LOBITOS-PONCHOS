import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Check, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
// Importamos los tipos y servicios de tu amigo
import { Product } from '../types';
import { db } from '../services/db';
import { useCart } from '../context/CartContext';

const features = [
  "Premium microfiber construction",
  "One size fits all design",
  "Machine washable",
  "Quick-dry technology",
  "Lifetime warranty",
  "Free shipping worldwide",
];

export const BuySection = () => {
  // --- LÓGICA DEL CÓDIGO DE TU AMIGO ---
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    setProducts(db.getProducts());
  }, []);

  const handleBuyClick = (product: Product) => {
    addToCart(product);
    // Usamos tu estilo de Toast (más bonito) pero con el nombre dinámico
    toast.success(`Agregado ${product.name} al carrito!`, {
      description: "Tu poncho premium está listo para el checkout.",
    });
  };

  return (
    <section id="buy" className="py-24 bg-gradient-to-b from-sand-light/20 to-background">
      <div className="container mx-auto px-4">

        {/* Título de la sección (Opcional, para dar contexto si hay varios productos) */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Nuestra Colección</h2>
          <p className="text-stone-500">Calidad y estilo en cada diseño.</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-16"> {/* space-y-16 separa cada tarjeta de producto */}

          {/* --- ITERAMOS SOBRE LOS PRODUCTOS (El Map de tu amigo) --- */}
          {products.map((product) => (
            <div key={product.id} className="bg-card rounded-3xl shadow-2xl border border-border/50 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">

                {/* Left side - Product info (TU DISEÑO) */}
                <div className="p-10 md:p-12 bg-gradient-to-br from-primary/5 to-accent/5">
                  <div className="mb-6">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                      {/* Aquí inyectamos el nombre del producto dinámicamente */}
                      <span className="text-foreground">{product.name.split(' ')[0]}</span>{' '}
                      <span className="text-primary">{product.name.split(' ').slice(1).join(' ')}</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                      {product.description || "The ultimate changing experience for passionate surfers"}
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 opacity-0 animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-card-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-border/50">
                    <p className="text-sm text-muted-foreground">
                      30-day money-back guarantee • Secure checkout
                    </p>
                  </div>
                </div>

                {/* Right side - Pricing (TU DISEÑO) */}
                <div className="p-10 md:p-12 bg-card flex flex-col justify-center">
                  <div className="space-y-8">
                    <div>
                      <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                        Price
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl md:text-6xl font-bold text-primary">
                          {/* Precio dinámico */}
                          ${product.price}
                        </span>
                        {/* Si tienes un precio anterior en la DB, úsalo, si no calculamos uno ficticio para el efecto visual */}
                        <span className="text-2xl text-muted-foreground line-through">
                          ${product.price + 50}
                        </span>
                      </div>
                      <p className="text-sm text-accent font-semibold mt-2">
                        Save $50 • Limited time offer
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Button
                        size="lg"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-7 text-lg font-semibold group shadow-lg hover:shadow-xl transition-all"
                        onClick={() => handleBuyClick(product)} // Pasamos el producto específico
                      >
                        <ShoppingCart className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                        Add to Cart
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary/10 py-7 text-lg"
                      >
                        Buy with PayPal
                      </Button>
                    </div>

                    <div className="pt-6 border-t border-border/50">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">In stock</span>
                        <span className="text-primary font-semibold">
                          Ships within 24h
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges (TU DISEÑO - Se mantiene al final) */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">10,000+</p>
            <p className="text-sm text-muted-foreground">Happy Surfers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">4.9/5</p>
            <p className="text-sm text-muted-foreground">Customer Rating</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">100%</p>
            <p className="text-sm text-muted-foreground">Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
};