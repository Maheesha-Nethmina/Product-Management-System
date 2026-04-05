import { Product } from "@/app/page";

export default function ProductList({ products, onEdit, onDelete }: any) {
  if (products.length === 0) return (
    <div className="text-center py-24 text-slate-600 dark:text-slate-400 font-bold bg-slate-50 dark:bg-slate-900/50 m-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-800 transition-colors">
      No products found in the inventory.
    </div>
  );

  return (
    <div className="w-full overflow-x-auto">
      {/* Added min-w-[800px] to force horizontal scroll on mobile instead of squishing */}
      <table className="w-full min-w-[800px] text-left border-collapse">
        <thead>
          <tr className="bg-slate-100 text-slate-600 dark:bg-slate-950 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 transition-colors">
            {/* Added whitespace-nowrap to headers so they don't break into two lines */}
            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Image</th>
            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Product Name</th>
            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Price</th>
            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Description</th>
            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-right whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
          {products.map((p: Product) => (
            <tr key={p.id} className="bg-white text-slate-900 hover:bg-slate-50 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800/80 transition-colors group">
              <td className="px-8 py-4 whitespace-nowrap">
                <div className="w-12 h-12 rounded-lg bg-slate-200 dark:bg-slate-950 flex items-center justify-center overflow-hidden border border-slate-300 dark:border-slate-800">
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[9px] text-slate-500 uppercase font-black tracking-tighter">No Img</span>
                  )}
                </div>
              </td>
              {/* Added whitespace-nowrap to prevent name stacking */}
              <td className="px-8 py-4 font-bold transition-colors whitespace-nowrap">{p.name}</td>
              <td className="px-8 py-4 whitespace-nowrap">
                <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400 px-3 py-1.5 rounded-md text-xs font-black border border-emerald-200 dark:border-emerald-500/20 transition-colors">
                  ${Number(p.price).toFixed(2)}
                </span>
              </td>
              <td className="px-8 py-4 text-slate-600 dark:text-slate-400 text-sm max-w-xs truncate transition-colors">{p.desc}</td>
              <td className="px-8 py-4 text-right whitespace-nowrap">
                <div className="flex justify-end gap-3">
                  {/*  Edit Button */}
                  <button 
                    onClick={() => onEdit(p)} 
                    className="px-4 py-2 rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-500/20 dark:text-indigo-400 dark:hover:bg-indigo-500/30 font-bold text-xs transition-colors shadow-sm active:scale-95"
                  >
                    Edit
                  </button>
                  {/*  Delete Button with Confirmation Dialog */}
                  <button 
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete "${p.name}"?`)) {
                        onDelete(p.id);
                      }
                    }} 
                    className="px-4 py-2 rounded-lg bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-500/20 dark:text-rose-400 dark:hover:bg-rose-500/30 font-bold text-xs transition-colors shadow-sm active:scale-95"
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