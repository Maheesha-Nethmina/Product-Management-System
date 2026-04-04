import { Product } from "@/app/page";

export default function ProductList({ products, onEdit, onDelete }: any) {
    if (products.length === 0) return (
        <div className="text-center py-20 text-slate-400 font-medium  dark:bg-white rounded-[32px] border border-slate-100 dark:border-slate-800 transition-colors">
            No products found in the inventory.
        </div>
    );

    return (
        <div className="w-full overflow-hidden bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                        <th className="px-8 py-5 text-[10px] font-bold tracking-widest uppercase text-slate-400">Item Details</th>
                        <th className="px-8 py-5 text-[10px] font-bold tracking-widest uppercase text-slate-400">Price</th>
                        <th className="px-8 py-5 text-[10px] font-bold tracking-widest uppercase text-slate-400 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                    {products.map((p: Product) => (
                        <tr key={p.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="px-8 py-6">
                                <div className="font-bold text-slate-800 dark:text-white text-lg">{p.name}</div>
                                <div className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1 max-w-md mt-1">{p.desc}</div>
                            </td>
                            <td className="px-8 py-6">
                                <span className="text-indigo-600 dark:text-indigo-400 font-black text-xl">
                                    ${Number(p.price).toFixed(2)}
                                </span>
                            </td>
                            <td className="px-8 py-6 text-right">
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => onEdit(p)}
                                        className="px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all active:scale-95 text-xs font-bold"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(p.id)}
                                        className="px-4 py-2 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-300 hover:bg-red-500 hover:text-white transition-all active:scale-95 text-xs font-bold"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}