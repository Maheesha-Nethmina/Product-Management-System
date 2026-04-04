'use client';
import { useState, useEffect } from 'react';
import ProductList from '@/components/product-list';
import ProductForm from '@/components/product-form';

export interface Product {
  id: number;
  name: string;
  price: number;
  desc: string;
  img: string;
  status: 'active' | 'low' | 'out';
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('furniq-data');
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('furniq-data', JSON.stringify(products));
  }, [products]);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (data: any) => {
    if (editProduct) {
      setProducts(prev => prev.map(p => p.id === editProduct.id ? { ...p, ...data } : p));
    } else {
      setProducts(prev => [{ ...data, id: Date.now() }, ...prev]);
    }
    setShowModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 min-h-screen bg-white dark:bg-[#020617] transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 pt-4">
        <div className="w-full md:w-auto text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Inventory
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
            {products.length} Products Total
          </p>
        </div>
        <button
          onClick={() => { setEditProduct(null); setShowModal(true); }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95"
        >
          + Add Product
        </button>
      </div>

      <div className="mb-8 max-w-md">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-4 focus:ring-indigo-100 outline-none transition-all placeholder:text-slate-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ProductList
        products={filtered}
        onEdit={(p: Product) => { setEditProduct(p); setShowModal(true); }}
        onDelete={(id: number) => setProducts(prev => prev.filter(p => p.id !== id))}
      />

      {showModal && (
        <ProductForm
          onClose={() => setShowModal(false)}
          onSubmit={handleSave}
          initialData={editProduct}
        />
      )}
    </div>
  );
}