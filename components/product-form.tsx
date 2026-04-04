'use client';
import { useState, useEffect } from 'react';

export default function ProductForm({ onClose, onSubmit, initialData }: any) {
    const [form, setForm] = useState({ name: '', price: '', desc: '' });

    useEffect(() => {
        if (initialData) setForm({
            name: initialData.name,
            price: String(initialData.price),
            desc: initialData.desc
        });
    }, [initialData]);

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-[#0b1120] w-full max-w-md rounded-[40px] p-10 shadow-2xl border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-200 text-left">
                <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white tracking-tight">
                    {initialData ? 'Update Product' : 'New Product'}
                </h2>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Product Name</label>
                        <input
                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border-none focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            placeholder="Enter product name"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Price (USD)</label>
                        <input
                            type="number"
                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border-none focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            value={form.price}
                            onChange={e => setForm({ ...form, price: e.target.value })}
                            placeholder="0.00"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Description</label>
                        <textarea
                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border-none focus:ring-2 focus:ring-indigo-500 outline-none h-32 resize-none transition-all"
                            value={form.desc}
                            onChange={e => setForm({ ...form, desc: e.target.value })}
                            placeholder="Brief description of the item..."
                            required
                        />
                    </div>
                    <div className="flex gap-4 pt-4">
                        <button onClick={onClose} className="flex-1 py-4 font-bold text-slate-400 hover:text-slate-600 transition-colors">Cancel</button>
                        <button
                            onClick={() => onSubmit({ ...form, price: parseFloat(form.price) })}
                            className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all active:scale-95"
                        >
                            {initialData ? 'Save Changes' : 'Create Item'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}