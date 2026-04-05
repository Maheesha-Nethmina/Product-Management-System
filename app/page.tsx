'use client';// Required in Next.js App Router to enable client-side features like useState and useEffect

import { useState, useEffect } from 'react';
import ProductList from '@/components/product-list';
import ProductForm from '@/components/product-form';

// Define the Product object
export interface Product {
  id: number;
  name: string;
  price: number;
  desc: string;
  image?: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

 
  //Load data from localStorage when the component first mounts
  useEffect(() => {
    const saved = localStorage.getItem('furniq-data');
    if (saved) setProducts(JSON.parse(saved));
  }, []);
//Save data to localStorage whenever the 'products' array changes
  useEffect(() => {
    localStorage.setItem('furniq-data', JSON.stringify(products));
  }, [products]);
// Create a derived array of products based on search text AND price filters
  const filtered = products.filter(p => {
    // Check if the product name or description includes the search text (case-insensitive)
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.desc.toLowerCase().includes(search.toLowerCase());
    // Check if the product falls within the selected price bracket
    let matchesPrice = true;
    if (priceFilter === 'under50') matchesPrice = p.price < 50;
    else if (priceFilter === '50to200') matchesPrice = p.price >= 50 && p.price <= 200;
    else if (priceFilter === 'over200') matchesPrice = p.price > 200;
// A product must match BOTH criteria to be displayed
    return matchesSearch && matchesPrice;
  });

  // Use reduce to sum up the price of all products in the inventory
  const totalValue = products.reduce((sum, p) => sum + Number(p.price), 0);
  const avgPrice = products.length > 0 ? totalValue / products.length : 0;

// Handle form submission for both Creating and Updating products
  const handleSave = (data: any) => {
    //update existing product
    if (editProduct) {
      setProducts(prev => prev.map(p => p.id === editProduct.id ? { ...p, ...data } : p));
    } else {
      // create new product
      setProducts(prev => [{ ...data, id: Date.now() }, ...prev]);
    }
    // Close the modal after saving
    setShowModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors">Product Management Page</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1 transition-colors">Efficiently managing your inventory with a modern touch.</p>
        </div>
        {/* UPDATED: Add New Product Button Colors */}
        <button
          onClick={() => { setEditProduct(null); setShowModal(true); }}
          className="bg-slate-900 text-white hover:bg-slate-900 dark:bg-white dark:hover:bg-white dark:text-slate-900 px-6 py-3 rounded-lg font-bold transition-all active:scale-95 shadow-md"
        >
          Add New Product
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: 'Total Products', value: products.length, sub: 'Active in inventory', icon: '📦' },
          { label: 'Average Price', value: `$${avgPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, sub: 'Per product in catalog', icon: '📊' },
          { label: 'Total Value', value: `$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, sub: 'Cumulative pricing', icon: '💰' },
        ].map((stat, i) => (
          <div key={i} className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm transition-colors">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{stat.label}</span>
              <span className="opacity-80">{stat.icon}</span>
            </div>
            <div className="text-3xl font-black mb-1">{stat.value}</div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by name or description..."
          className="flex-grow px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white text-slate-900 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-colors shadow-sm placeholder:text-slate-400 font-medium"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        <select 
          className="px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white text-slate-900 dark:bg-slate-900 dark:text-white outline-none min-w-[180px] shadow-sm transition-colors font-medium cursor-pointer"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="all">All Prices</option>
          <option value="under50">Under $50</option>
          <option value="50to200">$50 - $200</option>
          <option value="over200">Over $200</option>
        </select>
      </div>

      {/* Main Table Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden transition-colors">
        <ProductList
          products={filtered}
          onEdit={(p: Product) => { setEditProduct(p); setShowModal(true); }}
          onDelete={(id: number) => setProducts(prev => prev.filter(p => p.id !== id))}
        />
      </div>

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