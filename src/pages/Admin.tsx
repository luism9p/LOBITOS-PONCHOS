import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/db';
import { Product } from '../types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Trash2, Plus } from 'lucide-react';

interface ProductFormData {
    name: string;
    price: number;
    description: string;
    image: string;
    category: 'poncho' | 'Ponchos' | 'other';
}

const Admin = () => {
    const { user, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [isAdding, setIsAdding] = useState(false);

    // New Product State
    const [newProduct, setNewProduct] = useState<ProductFormData>({
        name: '',
        price: 0,
        description: '',
        image: '',
        category: 'poncho'
    });

    useEffect(() => {
        if (!user || !isAdmin) {
            navigate('/login');
            return;
        }
        setProducts(db.getProducts());
    }, [user, isAdmin, navigate]);

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            db.deleteProduct(id);
            setProducts(db.getProducts());
            toast.success('Product deleted');
        }
    };

    const handleAddProduct = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProduct.name || !newProduct.price) return;

        const productToAdd: Omit<Product, 'id'> = {
            name: newProduct.name,
            price: newProduct.price,
            description: newProduct.description,
            images: [newProduct.image],
            category: newProduct.category,
            details: [],
            measures: {}
        };

        db.addProduct(productToAdd);
        setProducts(db.getProducts());
        setIsAdding(false);
        setNewProduct({ name: '', price: 0, description: '', image: '', category: 'poncho' });
        toast.success('Product added successfully');
    };

    if (!isAdmin) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-light text-stone-900">Admin Dashboard</h1>
                <Button onClick={() => setIsAdding(!isAdding)} className="bg-stone-900 text-white rounded-none">
                    <Plus className="h-4 w-4 mr-2" /> Add Product
                </Button>
            </div>

            {isAdding && (
                <div className="bg-stone-50 p-6 mb-8 border border-stone-200">
                    <h2 className="text-lg font-medium mb-4">Add New Product</h2>
                    <form onSubmit={handleAddProduct} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                placeholder="Product Name"
                                value={newProduct.name}
                                onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                                required
                            />
                            <Input
                                type="number"
                                placeholder="Price"
                                value={newProduct.price || ''}
                                onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                                required
                            />
                            <Input
                                placeholder="Image URL"
                                value={newProduct.image}
                                onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                            />
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={newProduct.category}
                                onChange={e => setNewProduct({ ...newProduct, category: e.target.value as 'poncho' | 'Ponchos' | 'other' })}
                            >
                                <option value="poncho">Poncho</option>
                                <option value="Ponchos">Ponchos</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <Textarea
                            placeholder="Description"
                            value={newProduct.description}
                            onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                        />
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
                            <Button type="submit" className="bg-stone-900 text-white">Save Product</Button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white border border-stone-200">
                <table className="min-w-full divide-y divide-stone-200">
                    <thead className="bg-stone-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-stone-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-stone-200">
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0">
                                            <img className="h-10 w-10 rounded-full object-cover" src={product.images[0]} alt="" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-stone-900">{product.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-stone-100 text-stone-800">
                                        {product.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
                                    ${product.price}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900">
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;
