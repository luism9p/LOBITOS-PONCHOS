import React, { useState } from 'react';
import { Product } from '../types';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductModal } from './ProductModal';
import { useLanguage } from '../context/LanguageContext';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { t } = useLanguage();

    const nextImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    return (
        <>
            <div className="group relative">
                <div
                    className="aspect-[3/4] w-full overflow-hidden bg-stone-100 relative cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                >
                    {product.images[currentImageIndex].endsWith('.mp4') ? (
                        <video
                            key={currentImageIndex}
                            src={product.images[currentImageIndex]}
                            className="h-full w-full object-cover object-center transition-all duration-500 animate-in fade-in"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    ) : (
                        <img
                            key={currentImageIndex}
                            src={product.images[currentImageIndex]}
                            alt={product.name}
                            className="h-full w-full object-cover object-center transition-all duration-500 animate-in fade-in"
                        />
                    )}

                    {/* Image Navigation - Visible on hover */}
                    <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                        <button
                            onClick={prevImage}
                            className="p-1 rounded-full bg-white/80 hover:bg-white text-stone-800 pointer-events-auto transition-colors shadow-sm"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="p-1 rounded-full bg-white/80 hover:bg-white text-stone-800 pointer-events-auto transition-colors shadow-sm"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Dots indicator */}
                    <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {product.images.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1.5 w-1.5 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                            />
                        ))}
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/50 to-transparent z-10">
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                onAddToCart(product);
                            }}
                            className="w-full bg-white text-black hover:bg-stone-100 border-none"
                        >
                            {t('product.add_to_cart')}
                        </Button>
                    </div>
                </div>
                <div className="mt-4 flex justify-between">
                    <div>
                        <h3 className="text-sm text-stone-700 font-medium">
                            <button onClick={() => setIsModalOpen(true)} className="text-left hover:underline">
                                <span aria-hidden="true" className="absolute inset-0" />
                                {product.name}
                            </button>
                        </h3>
                        <p className="mt-1 text-sm text-stone-500">{t(`product.category.${product.category}` as any)}</p>
                    </div>
                    <p className="text-sm font-medium text-stone-900">${product.price}</p>
                </div>
            </div>

            <ProductModal
                product={product}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddToCart={onAddToCart}
            />
        </>
    );
};
