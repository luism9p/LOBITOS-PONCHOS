import React, { useState } from 'react';
import { Product } from '@/types';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ProductModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
    onAddToCart: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
    product,
    isOpen,
    onClose,
    onAddToCart,
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { t, language } = useLanguage();

    if (!product) return null;

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
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-5xl w-full max-h-[90vh] p-0 gap-0 bg-white overflow-hidden flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="w-full md:w-1/2 h-64 md:h-full bg-stone-100 relative group flex-shrink-0">
                    {product.images[currentImageIndex].endsWith('.mp4') ? (
                        <video
                            key={currentImageIndex}
                            src={product.images[currentImageIndex]}
                            className="w-full h-full object-cover animate-in fade-in duration-500"
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
                            className="w-full h-full object-cover animate-in fade-in duration-500"
                        />
                    )}

                    {/* Image Navigation - Visible on hover */}
                    <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                        <button
                            onClick={prevImage}
                            className="p-2 rounded-full bg-white/80 hover:bg-white text-stone-800 pointer-events-auto transition-colors shadow-sm"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="p-2 rounded-full bg-white/80 hover:bg-white text-stone-800 pointer-events-auto transition-colors shadow-sm"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Dots indicator */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-20">
                        {product.images.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1.5 w-1.5 rounded-full transition-colors shadow-sm ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 flex flex-col overflow-y-auto">
                    <div className="p-6 flex flex-col flex-1">
                        <DialogHeader className="mb-4">
                            <DialogTitle className="text-2xl font-light text-stone-900">
                                {product.name}
                            </DialogTitle>
                            <DialogDescription className="text-lg font-medium text-stone-900 mt-2">
                                ${product.price}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex-1 overflow-y-auto -mr-4 pr-4 mb-4">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-medium text-stone-900 mb-2 uppercase tracking-wide">
                                        {t('product.description')}
                                    </h4>
                                    <p className="text-stone-600 text-sm leading-relaxed">
                                        {product.description[language]}
                                    </p>
                                </div>

                                {product.details && (
                                    <div>
                                        <h4 className="text-sm font-medium text-stone-900 mb-2 uppercase tracking-wide">
                                            {t('product.details')}
                                        </h4>
                                        <ul className="list-disc list-inside text-stone-600 text-sm space-y-1">
                                            {product.details[language].map((detail, index) => (
                                                <li key={index}>{detail}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {product.measures && (
                                    <div>
                                        <h4 className="text-sm font-medium text-stone-900 mb-2 uppercase tracking-wide">
                                            {t('product.measures')}
                                        </h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            {Object.entries(product.measures).map(([key, value]) => (
                                                <div key={key} className="bg-stone-50 p-3 rounded-sm">
                                                    <span className="block text-xs text-stone-500 uppercase tracking-wider mb-1">
                                                        {t(`product.measure_labels.${key}` as any) || key}
                                                    </span>
                                                    <span className="block text-sm font-medium text-stone-900">
                                                        {value}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-stone-100 flex-shrink-0">
                            <Button
                                onClick={() => {
                                    onAddToCart(product);
                                    onClose();
                                }}
                                className="w-full bg-stone-900 text-white hover:bg-stone-800 rounded-none py-6 text-sm uppercase tracking-widest"
                            >
                                {t('product.add_to_cart')}
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
