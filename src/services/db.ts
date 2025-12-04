import { Product, Subscription, User } from '../types';

const STORAGE_KEYS = {
    PRODUCTS: 'Lobitos Ponchos_products_v9',
    USERS: 'Lobitos Ponchos_users',
    SUBSCRIPTIONS: 'Lobitos Ponchos_subscriptions',
};

// Helper to generate MD series products
const generateProducts = (): Product[] => {
    const products: Product[] = [];

    const models = [
        { id: 'model-1', name: 'Modelo: Ofrenda de Sosa', prefix: 'md0' },
        { id: 'model-2', name: 'Modelo: Lila Reyna', prefix: 'md1' },
        { id: 'model-3', name: 'Modelo: Dolce Vita', prefix: 'md2' },
        { id: 'model-4', name: 'Modelo: Kauz Poncho', prefix: 'md3' },
        { id: 'model-5', name: 'Modelo: Long Sleeves Violin', prefix: 'md4' },
        { id: 'model-6', name: 'Modelo: Risa purpura y Green Roover', prefix: 'md5' },
    ];

    models.forEach((model, index) => {
        products.push({
            id: model.id,
            name: model.name,
            description: {
                en: 'Handcrafted with premium materials for ultimate comfort and style.',
                es: 'Hecho a mano con materiales premium para máxima comodidad y estilo.'
            },
            price: 129,
            images: [
                `/fotos/${model.prefix}1.jpg`,
                `/fotos/${model.prefix}2.jpg`,
                `/fotos/${model.prefix}3.${model.prefix === 'md5' ? 'mp4' : 'jpg'}`
            ],
            category: index < 3 ? 'poncho' : 'Ponchos',
            details: {
                en: [
                    'Material: 100% Premium Alpaca Wool',
                    'Handwoven by artisans in the Andes',
                    'Hypoallergenic and breathable',
                    'Sustainable and eco-friendly production',
                    'Care: Dry clean only'
                ],
                es: [
                    'Material: 100% Lana de Alpaca Premium',
                    'Tejido a mano por artesanos de los Andes',
                    'Hipoalergénico y transpirable',
                    'Producción sostenible y ecológica',
                    'Cuidado: Lavado en seco únicamente'
                ]
            },
            measures: {
                'Total Length': '120 cm',
                'Width': '140 cm',
                'Sleeve Length': '60 cm',
                'Neck Opening': '30 cm'
            }
        });
    });

    return products;
};

// Initial Data
const INITIAL_PRODUCTS: Product[] = generateProducts();

export const db = {
    // Products
    getProducts: (): Product[] => {
        const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
        if (!stored) {
            localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
            return INITIAL_PRODUCTS;
        }
        return JSON.parse(stored);
    },

    addProduct: (product: Omit<Product, 'id'>): Product => {
        const products = db.getProducts();
        const newProduct = { ...product, id: crypto.randomUUID() };
        const updated = [...products, newProduct];
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
        return newProduct;
    },

    deleteProduct: (id: string): void => {
        const products = db.getProducts();
        const updated = products.filter((p) => p.id !== id);
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
    },

    // Subscriptions
    getSubscriptions: (): Subscription[] => {
        const stored = localStorage.getItem(STORAGE_KEYS.SUBSCRIPTIONS);
        return stored ? JSON.parse(stored) : [];
    },

    addSubscription: (email: string): Subscription => {
        const subs = db.getSubscriptions();
        if (subs.find((s) => s.email === email)) {
            throw new Error('Email already subscribed');
        }
        const newSub = { id: crypto.randomUUID(), email, createdAt: new Date().toISOString() };
        const updated = [...subs, newSub];
        localStorage.setItem(STORAGE_KEYS.SUBSCRIPTIONS, JSON.stringify(updated));
        return newSub;
    },

    // Auth (Mock)
    login: (email: string): User | null => {
        if (email === 'admin@Lobitos Ponchos.com') {
            return { id: 'admin-1', email, role: 'admin', name: 'Admin User' };
        }
        return { id: 'user-' + crypto.randomUUID(), email, role: 'customer' };
    },
};
