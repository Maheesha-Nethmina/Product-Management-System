'use client';
import { useState, useEffect } from 'react';

export default function Navbar(): JSX.Element {
    const [dark, setDark] = useState<boolean>(false);

    useEffect(() => {
        // Run this only on the client
        const saved = localStorage.getItem('spm-dark') === '1';
        setDark(saved);
        if (saved) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDark = () => {
        const next = !dark;
        setDark(next);
        localStorage.setItem('spm-dark', next ? '1' : '0');

        if (next) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <nav className="bg-white dark:bg-[#0b1120] border-b border-slate-100 dark:border-slate-800 sticky top-0 z-40 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200 dark:shadow-none">P</div>
                    <span className="font-bold text-xl text-slate-900 dark:text-white transition-colors">Produit</span>
                </div>
                <button
                    onClick={toggleDark}
                    className="p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer border border-transparent dark:border-slate-700"
                    aria-label="Toggle Dark Mode"
                >
                    {dark ? '🌙' : '☀️'}
                </button>
            </div>
        </nav>
    );
}