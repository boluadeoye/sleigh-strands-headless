"use client";
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, ShoppingBag, AlertCircle } from 'lucide-react';
import * as gtag from '@/lib/gtag';

export default function AddToCart({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedAttributes, setSelectedAttributes] = useState<any>({});
  const [selectedVariation, setSelectedVariation] = useState<any>(null);
  const { addToCart } = useCart();

  const isVariable = product.type === 'variable';
  const variations = product.variations_data || [];

  // Match variation whenever attributes change
  useEffect(() => {
    if (isVariable && variations.length > 0) {
      const match = variations.find((v: any) => {
        // Check if every selected attribute matches this variation
        return Object.entries(selectedAttributes).every(([key, val]) => {
          const vAttr = v.attributes.find((a: any) => a.name.toLowerCase() === key.toLowerCase());
          // Match if attribute value is identical OR if variation allows "Any" (empty string)
          return vAttr && (vAttr.option === val || vAttr.option === "");
        });
      });
      
      // Only set if all required attributes are selected
      const allSelected = product.attributes.every((attr: any) => 
        selectedAttributes[attr.name.toLowerCase()]
      );

      if (allSelected) {
        setSelectedVariation(match);
      } else {
        setSelectedVariation(null);
      }
    }
  }, [selectedAttributes, variations, product.attributes, isVariable]);

  const handleAttributeClick = (name: string, option: string) => {
    setSelectedAttributes((prev: any) => ({
      ...prev,
      [name.toLowerCase()]: option
    }));
  };

  const handleAdd = () => {
    const targetPrice = selectedVariation ? selectedVariation.price : product.price;
    addToCart(product, quantity, selectedVariation);
    
    gtag.event({
      action: 'add_to_cart',
      params: {
        currency: 'NGN',
        value: parseFloat(targetPrice) * quantity,
        items: [{
          item_id: product.id,
          item_name: product.name,
          price: parseFloat(targetPrice),
          quantity: quantity,
          item_variant: selectedVariation ? Object.values(selectedVariation.attributes).map((a: any) => a.option).join(' / ') : undefined
        }]
      }
    });
  };

  const currentPrice = selectedVariation ? selectedVariation.price : product.price;
  const isOutOfStock = selectedVariation ? selectedVariation.stock_status === 'outofstock' : product.stock_status === 'outofstock';
  const canAdd = !isVariable || (isVariable && selectedVariation && !isOutOfStock);

  return (
    <div className="flex flex-col gap-8">
      {/* ATTRIBUTE SELECTORS */}
      {isVariable && product.attributes?.map((attr: any) => (
        <div key={attr.id} className="space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 ml-1">
            Select {attr.name}
          </span>
          <div className="flex flex-wrap gap-2">
            {attr.options.map((option: string) => {
              const isSelected = selectedAttributes[attr.name.toLowerCase()] === option;
              return (
                <button
                  key={option}
                  onClick={() => handleAttributeClick(attr.name, option)}
                  className={`px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all border ${
                    isSelected 
                      ? 'bg-[#8B2632] border-[#8B2632] text-white shadow-md' 
                      : 'bg-white border-black/10 text-black/60 hover:border-[#8B2632]'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* DYNAMIC PRICE */}
      <div className="text-4xl md:text-5xl font-sans font-bold text-black tracking-tight">
        ₦{parseFloat(currentPrice || "0").toLocaleString()}
      </div>

      {/* QUANTITY & BUTTON */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center justify-between bg-[#F5E6E8]/50 border border-[#8B2632]/10 px-6 py-4 rounded-full w-full sm:w-40">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-[#8B2632] hover:scale-125 transition-transform"><Minus size={18} /></button>
          <span className="font-bold text-lg text-[#8B2632]">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} className="text-[#8B2632] hover:scale-125 transition-transform"><Plus size={18} /></button>
        </div>
        <button 
          onClick={handleAdd} 
          disabled={!canAdd}
          className="w-full sm:flex-1 bg-[#8B2632] text-white font-bold py-5 rounded-full text-[11px] uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:bg-gray-400"
        >
          {isVariable && !selectedVariation && !isOutOfStock ? (
            'Select Options'
          ) : isOutOfStock ? (
            'Sold Out'
          ) : (
            <>
              <ShoppingBag size={16} /> Add to cart
            </>
          )}
        </button>
      </div>
      
      {isVariable && !selectedVariation && (
        <p className="text-[10px] text-[#8B2632] font-medium italic flex items-center gap-1">
          <AlertCircle size={12} /> Please select all options to see the final price.
        </p>
      )}
    </div>
  );
}
