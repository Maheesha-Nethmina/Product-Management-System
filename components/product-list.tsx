import { Product } from "@/app/page";

export default function ProductList({ products, onEdit, onDelete }: any) {
    if (products.length === 0) return (
        <div className="text-center py-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl text-slate-400 font-medium w-full">
            No products found matching your search.
        </div>
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((p: Product) => (
                <div key={p.id} className="group bg-white dark:bg-[#0b1120] rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="h-52 bg-slate-50 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                        {p.img ? (
                            <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">No Preview</span>
                            </div>
                        )}
                    </div>

                    <div className="p-6 text-left">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white truncate">{p.name}</h3>
                        <p className="text-indigo-600 dark:text-indigo-400 font-black text-xl mt-1">${p.price.toFixed(2)}</p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-3 line-clamp-2 h-10 leading-relaxed">
                            {p.desc || "No description provided."}
                        </p>

                        <div className="grid grid-cols-2 gap-3 mt-6">
                            <button onClick={() => onEdit(p)} className="py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-bold transition-colors">
                                Edit
                            </button>
                            <button onClick={() => onDelete(p.id)} className="py-2.5 rounded-xl border border-red-100 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 text-sm font-bold transition-colors">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}