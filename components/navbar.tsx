'use client';
import { useState, useEffect } from 'react';

export default function Navbar(): JSX.Element {
    const [dark, setDark] = useState<boolean>(false);

    useEffect(() => {
        const saved = localStorage.getItem('spm-dark') === '1';
        setDark(saved);
        document.documentElement.classList.toggle('dark', saved);
    }, []);

    const toggleDark = () => {
        const next = !dark;
        setDark(next);
        localStorage.setItem('spm-dark', next ? '1' : '0');
        document.documentElement.classList.toggle('dark', next);
    };

    return (
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40">
            <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">P</div>
                    <span className="font-bold text-gray-900 dark:text-white">Produit</span>
                </div>
                <div className="flex gap-4 items-center">
                    <button onClick={toggleDark} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition">
                        {dark ? '🌙' : '☀️'}
                    </button>
                </div>
            </div>
        </nav>
    );
}