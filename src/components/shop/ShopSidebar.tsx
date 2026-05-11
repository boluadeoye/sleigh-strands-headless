"use client";
import { Search, RotateCcw } from 'lucide-react';

export default function ShopSidebar({ 
  categories, 
  selectedCategory, 
  setSelectedCategory,
  searchQuery,
  setSearchQuery
}: any) {
  return (
    <aside className="w-full md:w-64 flex flex-col gap-8">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={18} />
        <input 
          type="text"
          placeholder="Search Products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-black/5 rounded-full py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-[#8B2632]/20 transition-all"
        />
      </div>

      {/* Categories */}
      <div className="bg-white rounded-[2rem] p-8 border border-black/5 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-sans font-bold text-sm uppercase tracking-widest text-[#8B2632]">Categories</h3>
          <button 
            onClick={() => {setSelectedCategory(''); setSearchQuery('');}}
            className="text-black/40 hover:text-[#8B2632] transition-colors"
          >
            <RotateCcw size={14} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {categories.map((cat: any) => (
            <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox"
                checked={selectedCategory === cat.slug}
                onChange={() => setSelectedCategory(selectedCategory === cat.slug ? '' : cat.slug)}
                className="w-4 h-4 rounded border-gray-300 text-[#8B2632] focus:ring-[#8B2632]"
              />
              <span className="text-sm text-black/60 group-hover:text-black transition-colors">
                {cat.name}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
