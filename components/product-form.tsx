'use client';
import { useState, useEffect } from 'react';

export default function ProductForm({ onClose, onSubmit, initialData }: any) {
    const [form, setForm] = useState({ name: '', price: '', desc: '', img: '', status: 'active' });

    useEffect(() => {
        if (initialData) setForm({ ...initialData, price: String(initialData.price) });
    }, [initialData]);

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-[#0b1120] w-full max-w-md rounded-[32px] p-8 shadow-2xl border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-200 text-left">
                <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
                    {initialData ? 'Update Product' : 'New Product'}
                </h2>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Product Name</label>
                        <input
                            className="w-full px-4 py-3 mt-1 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border-none focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            placeholder="Enter product name"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Price (USD)</label>
                        <input
                            type="number"
                            className="w-full px-4 py-3 mt-1 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border-none focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            value={form.price}
                            onChange={e => setForm({ ...form, price: e.target.value })}
                            placeholder="0.00"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Image URL</label>
                        <input
                            className="w-full px-4 py-3 mt-1 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border-none focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            value={form.img}
                            onChange={e => setForm({ ...form, img: e.target.value })}
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Description</label>
                        <textarea
                            className="w-full px-4 py-3 mt-1 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border-none focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none transition-all"
                            value={form.desc}
                            onChange={e => setForm({ ...form, desc: e.target.value })}
                            placeholder="Short description..."
                        />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button onClick={onClose} className="flex-1 py-3 font-bold text-slate-400 hover:text-slate-600 transition-colors">Cancel</button>
                        <button
                            onClick={() => onSubmit({ ...form, price: parseFloat(form.price) })}
                            className="flex-1 bg-indigo-600 text-white py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 dark:shadow-none"
                        >
                            {initialData ? 'Save Changes' : 'Create Item'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}