import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { db } from '../services/db';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { useLanguage } from "@/context/LanguageContext";

const Shop = () => {
    const { t } = useLanguage();
    const [products, setProducts] = useState<Product[]>([]);
    const { addToCart } = useCart();

    useEffect(() => {
        setProducts(db.getProducts());
    }, []);

    const handleAddToCart = (product: Product) => {
        addToCart(product);
        toast.success(`Added ${product.name} to cart`);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-light text-stone-900 mb-2">{t('shop.collection')}</h1>
                <p className="text-stone-500 max-w-2xl mx-auto">
                    {t('shop.description')}
                </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
            </div>
        </div>
    );
};

export default Shop;
