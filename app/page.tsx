'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', description: '', image: '' });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState('');

  // Load from localStorage on start
  useEffect(() => {
    const saved = localStorage.getItem('products');
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  // Save to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.price || isNaN(form.price) || +form.price < 0) errs.price = 'Enter a valid price';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const openAdd = () => {
    setForm({ name: '', price: '', description: '', image: '' });
    setEditProduct(null);
    setErrors({});
    setShowModal(true);
  };

  const openEdit = (product) => {
    setForm({ name: product.name, price: product.price, description: product.description, image: product.image });
    setEditProduct(product);
    setErrors({});
    setShowModal(true);
  };

  const saveProduct = () => {
    if (!validate()) return;
    if (editProduct) {
      setProducts(products.map(p =>
        p.id === editProduct.id ? { ...p, ...form, price: +form.price } : p
      ));
      showToast('Product updated!');
    } else {
      setProducts([{ id: Date.now(), ...form, price: +form.price }, ...products]);
      showToast('Product added!');
    }
    setShowModal(false);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
    showToast('Product deleted.');
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
          <span className="text-sm text-gray-500">{products.length} items</span>
        </div>

        {/* Toolbar */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={openAdd}
            className="bg-gray-900 text-white px-5 py-2 rounded-lg text-sm hover:bg-gray-700 transition"
          >
            + Add Product
          </button>
        </div>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 mt-20">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.map(product => (
              <div key={product.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-36 object-cover" />
                ) : (
                  <div className="w-full h-36 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">No image</div>
                )}
                <div className="p-4">
                  <p className="font-medium text-gray-900 mb-1">{product.name}</p>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description || 'No description.'}</p>
                  <p className="font-semibold text-gray-900 mb-3">${Number(product.price).toFixed(2)}</p>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(product)} className="flex-1 border border-gray-200 rounded-lg py-1.5 text-sm text-gray-600 hover:bg-gray-50">Edit</button>
                    <button onClick={() => deleteProduct(product.id)} className="flex-1 border border-red-100 rounded-lg py-1.5 text-sm text-red-500 hover:bg-red-50">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-5">{editProduct ? 'Edit Product' : 'Add Product'}</h2>
            <div className="space-y-4">
              <div>
    
                <label className="text-sm text-gray-500 mb-1 block">Product Name *</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Price (USD) *</label>
                <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Image URL (optional)</label>
                <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })}
                  placeholder="https://..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="flex gap-3 mt-6 justify-end">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={saveProduct} className="px-5 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-700">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-5 py-3 rounded-lg text-sm">
          {toast}
        </div>
      )}
    </main>
  );
}