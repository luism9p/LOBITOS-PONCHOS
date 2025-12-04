export interface Product {
    id: string;
    name: string;
    description: { en: string; es: string };
    price: number;
    images: string[];
    category: 'poncho' | 'Ponchos' | 'other';
    details?: { en: string[]; es: string[] };
    measures?: Record<string, string>;
}

export interface User {
    id: string;
    email: string;
    role: 'admin' | 'customer';
    name?: string;
}

export interface Subscription {
    id: string;
    email: string;
    createdAt: string;
}

export interface CartItem extends Product {
    quantity: number;
}
