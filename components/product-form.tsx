'use client';
import { useState, useEffect } from 'react';

interface ProductFormProps {
  onClose: () => void;
  onSubmit: (data: { name: string; price: number; desc: string; image?: string }) => void;
  initialData?: any;
}

export default function ProductForm({ onClose, onSubmit, initialData }: ProductFormProps) {
    const [form, setForm] = useState({ name: '', price: '', desc: '', image: '' });

    useEffect(() => {
        if (initialData) {
            setForm({
                name: initialData.name,
                price: String(initialData.price),
                desc: initialData.desc,
                image: initialData.image || '',
            });
        }
    }, [initialData]);

    const handleSubmit = () => {
        const numericPrice = parseFloat(form.price);
        if (isNaN(numericPrice) || numericPrice < 0) {
            alert("Please enter a valid price (>= 0).");
            return;
        }
        onSubmit({ 
            ...form, 
            price: numericPrice, 
            image: form.image || undefined 
        });
    };

    const fields = [
        { label: 'Product Name', value: form.name, key: 'name', type: 'text', placeholder: 'Minimalist Lamp' },
        { label: 'Price (USD)', value: form.price, key: 'price', type: 'number', placeholder: '0.00' },
        { label: 'Product Image URL (Optional)', value: form.image, key: 'image', type: 'url', placeholder: 'https://example.com/image.jpg' },
    ];

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-950 w-full max-w-md rounded-[32px] p-10 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
                <h2 className="text-3xl font-bold mb-8 text-slate-950 dark:text-white tracking-tight">
                    {initialData ? 'Edit Product' : 'Add Product'}
                </h2>

                <div className="space-y-5">
                    {fields.map((field) => (
                        <div key={field.key} className="space-y-1.5 text-left">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide ml-1">{field.label}</label>
                            <input
                                type={field.type}
                                className="w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-400"
                                value={field.value as string}
                                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                                placeholder={field.placeholder}
                                required={field.key !== 'image'}
                            />
                        </div>
                    ))}

                    <div className="space-y-1.5 text-left">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide ml-1">Description</label>
                        <textarea
                            className="w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none h-28 resize-none transition-all"
                            value={form.desc}
                            onChange={(e) => setForm({ ...form, desc: e.target.value })}
                            placeholder="Brief description..."
                            required
                        />
                    </div>
                    
                    <div className="flex gap-4 pt-4">
                        <button onClick={onClose} className="flex-1 py-3 font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition-colors">Cancel</button>
                        {/* Matched Button Colors and Changed Text */}
                        <button
                            onClick={handleSubmit}
                            className="flex-1 bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 py-3 rounded-xl font-bold shadow-lg active:scale-95 transition-all"
                        >
                            {initialData ? 'Save Changes' : 'Add Product'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}