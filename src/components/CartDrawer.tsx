import React from 'react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

export const CartDrawer = () => {
    const { items, removeFromCart, addToCart, updateQuantity, total } = useCart();

    const handleWhatsAppOrder = () => {
        const greeting = "Hola Lobitos Ponchos, deseo pedir:";
        const itemsList = items.map(item =>
            `${item.name} (x${item.quantity}) - $${item.price * item.quantity}`
        ).join('\n');
        const totalMessage = `Total: $${total}`;

        const message = `${greeting}\n\n${itemsList}\n\n${totalMessage}`;
        const encodedMessage = encodeURIComponent(message);

        window.open(`https://wa.me/51994992633?text=${encodedMessage}`, '_blank');
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <ShoppingBag className="h-5 w-5" />
                    {items.length > 0 && (
                        <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-stone-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                            {items.reduce((acc, item) => acc + item.quantity, 0)}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md flex flex-col">
                <SheetHeader>
                    <SheetTitle className="text-xl font-light uppercase tracking-wide">Your Cart</SheetTitle>
                </SheetHeader>

                <div className="flex-1 mt-8 overflow-hidden flex flex-col">
                    {items.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-stone-500">
                            <ShoppingBag className="h-12 w-12 mb-4 opacity-20" />
                            <p>Your cart is empty</p>
                        </div>
                    ) : (
                        <>
                            <ScrollArea className="flex-1 -mx-6 px-6">
                                <div className="space-y-6">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-stone-200">
                                                <img
                                                    src={item.images[0]}
                                                    alt={item.name}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>

                                            <div className="flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-stone-900">
                                                        <h3>{item.name}</h3>
                                                        <p className="ml-4">${item.price * item.quantity}</p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-stone-500 capitalize">{item.category}</p>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex items-center border border-stone-200 rounded-md">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8 rounded-none"
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                disabled={item.quantity <= 1}
                                                            >
                                                                <Minus className="h-3 w-3" />
                                                            </Button>
                                                            <span className="w-8 text-center text-stone-900 font-medium">{item.quantity}</span>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8 rounded-none"
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            >
                                                                <Plus className="h-3 w-3" />
                                                            </Button>
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-stone-400 hover:text-red-600"
                                                            onClick={() => removeFromCart(item.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>

                            <div className="border-t border-stone-100 pt-6 mt-6 space-y-4">
                                <div className="flex justify-between text-base font-medium text-stone-900">
                                    <p>Subtotal</p>
                                    <p>${total}</p>
                                </div>
                                <p className="text-sm text-stone-500">Shipping and taxes calculated at checkout.</p>
                                <Button
                                    className="w-full bg-stone-900 text-white hover:bg-stone-800 rounded-none py-6 text-base uppercase tracking-widest"
                                    onClick={handleWhatsAppOrder}
                                >
                                    Checkout
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
};
