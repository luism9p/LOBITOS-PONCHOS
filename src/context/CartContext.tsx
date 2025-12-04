import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('Lobitos Ponchos_cart');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                // Validate items have the new 'images' property
                const validItems = parsed.map((item: any) => {
                    if (item.images && Array.isArray(item.images)) {
                        return item;
                    }
                    // Migration for old items: if they have 'image', make it an array. 
                    // However, old images were Unsplash URLs, new ones are local. 
                    // Best to just clear invalid items or try to keep them if possible.
                    // Let's try to migrate if 'image' exists, otherwise discard.
                    if (item.image) {
                        return { ...item, images: [item.image] };
                    }
                    return null;
                }).filter(Boolean) as CartItem[];

                setItems(validItems);
            } catch (e) {
                console.error("Failed to parse cart", e);
                localStorage.removeItem('Lobitos Ponchos_cart');
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('Lobitos Ponchos_cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (product: Product) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: string) => {
        setItems((prev) => prev.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }
        setItems((prev) =>
            prev.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => setItems([]);

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
