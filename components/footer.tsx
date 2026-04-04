'use client';

export default function Footer(): JSX.Element {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 dark:bg-[#0b1120] border-t border-slate-800 transition-colors mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-10">

                {/* Top Section: Brand and Quick Info */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-indigo-500 rounded-md flex items-center justify-center">
                                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                    <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
                                </svg>
                            </div>
                            <span className="font-bold text-white tracking-tight">Produit</span>
                        </div>
                        <p className="text-xs text-slate-400 max-w-[200px]">
                            Efficiently managing your inventory with a modern touch.
                        </p>
                    </div>

                    {/* Links Group */}
                    <div className="flex gap-10">
                        <div className="space-y-3">
                            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Platform</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-xs text-slate-400 hover:text-indigo-400 transition">Inventory</a></li>
                                <li><a href="#" className="text-xs text-slate-400 hover:text-indigo-400 transition">Analytics</a></li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Company</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-xs text-slate-400 hover:text-indigo-400 transition">About</a></li>
                                <li><a href="#" className="text-xs text-slate-400 hover:text-indigo-400 transition">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Copyright */}
                <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-[11px] text-slate-500">
                        © {currentYear} Produit. Assessment Project.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="text-[11px] text-slate-500 hover:text-slate-300 transition">Privacy</a>
                        <a href="#" className="text-[11px] text-slate-500 hover:text-slate-300 transition">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}