"use client";
import { useState } from 'react';
import ShopSidebar from './ShopSidebar';
import ProductCard from './ProductCard';

export default function ShopClient({ initialProducts, categories }: { initialProducts: any[], categories: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = initialProducts.filter(product => {
    const matchesCategory = selectedCategory === '' || product.categories.some((c: any) => c.slug === selectedCategory);
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col md:flex-row gap-12">
      <ShopSidebar 
        categories={categories} 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <div className="flex-1">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-black/40 font-sans italic text-xl">No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
