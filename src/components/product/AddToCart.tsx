"use client";
import { useState, useEffect } from 'react';
import { useCart, GiftPackagingOption } from '@/context/CartContext';
import { Minus, Plus, ShoppingBag, AlertCircle, Clock, Gift, Check } from 'lucide-react';
import Image from 'next/image';
import * as gtag from '@/lib/gtag';

const PACKAGING_OPTIONS = [
  {
    id: 'standard' as const,
    name: 'Standard Packaging',
    price: 0,
    priceLabel: 'Free',
    image: 'https://res.cloudinary.com/dwbjb3svx/image/upload/v1790689354/blog_assets/bya2pdw97udfokjqkdxl.jpg',
    description: 'Complimentary signature silk pouch'
  },
  {
    id: 'premium' as const,
    name: 'Premium Gift Box',
    price: 5000,
    priceLabel: '₦5,000',
    image: 'https://res.cloudinary.com/dwbjb3svx/image/upload/v1790689341/blog_assets/gr4ahkn26yuqsvyiwfio.jpg',
    description: 'Rigid luxury maroon keepsake box with gold foil'
  }
];

export default function AddToCart({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedAttributes, setSelectedAttributes] = useState<any>({});
  const [selectedVariation, setSelectedVariation] = useState<any>(null);
  const [selectedPackaging, setSelectedPackaging] = useState<'standard' | 'premium'>('standard');
  const [giftMessage, setGiftMessage] = useState('');
  const { addToCart } = useCart();

  const isVariable = product.type === 'variable';
  const variations = product.variations_data || [];

  useEffect(() => {
    if (isVariable && variations.length > 0) {
      const match = variations.find((v: any) => {
        return Object.entries(selectedAttributes).every(([key, val]) => {
          const vAttr = v.attributes.find((a: any) => a.name.toLowerCase() === key.toLowerCase());
          return vAttr && (vAttr.option === val || vAttr.option === "");
        });
      });
      const allSelected = product.attributes.every((attr: any) => selectedAttributes[attr.name.toLowerCase()]);
      if (allSelected) {
        setSelectedVariation(match);
      } else {
        setSelectedVariation(null);
      }
    }
  }, [selectedAttributes, variations, product.attributes, isVariable]);

  const handleAttributeClick = (name: string, option: string) => {
    setSelectedAttributes((prev: any) => ({ ...prev, [name.toLowerCase()]: option }));
  };

  const handleAdd = () => {
    const targetPrice = selectedVariation ? selectedVariation.price : product.price;
    const chosenOption = PACKAGING_OPTIONS.find(p => p.id === selectedPackaging)!;
    const packagingData: GiftPackagingOption = {
      id: chosenOption.id,
      name: chosenOption.name,
      price: chosenOption.price,
      message: chosenOption.id === 'premium' ? giftMessage.trim() : undefined
    };

    addToCart(product, quantity, selectedVariation, packagingData);

    gtag.event({
      action: 'add_to_cart',
      params: {
        currency: 'NGN',
        value: (parseFloat(targetPrice) + packagingData.price) * quantity,
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

  const target = selectedVariation || product;
  const isOutOfStock = target.stock_status === 'outofstock';
  const isOnBackorder = target.stock_status === 'onbackorder';
  const allowsBackorder = target.backorders !== 'no';
  const isPreOrder = isOnBackorder || (isOutOfStock && allowsBackorder);
  const isHardSoldOut = isOutOfStock && !allowsBackorder && !isOnBackorder;
  const currentPrice = target.price;
  const canAdd = !isVariable || (isVariable && selectedVariation && !isHardSoldOut);

  return (
    <div className="flex flex-col gap-8">
      {isVariable && product.attributes?.map((attr: any) => (
        <div key={attr.id} className="space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 ml-1">Select {attr.name}</span>
          <div className="flex flex-wrap gap-2">
            {attr.options.map((option: string) => {
              const isSelected = selectedAttributes[attr.name.toLowerCase()] === option;
              return (
                <button
                  key={option}
                  onClick={() => handleAttributeClick(attr.name, option)}
                  className={`px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all border cursor-pointer ${
                    isSelected ? 'bg-[#8B2632] border-[#8B2632] text-white shadow-md' : 'bg-white border-black/10 text-black/60 hover:border-[#8B2632]'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="text-4xl md:text-5xl font-sans font-bold text-black tracking-tight">
        ₦{parseFloat(currentPrice || "0").toLocaleString()}
      </div>

      <div className="space-y-4 pt-2 border-t border-black/5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8B2632] flex items-center gap-1.5">
            <Gift size={14} /> Add Gift Packaging?
          </span>
          <span className="text-[10px] text-black/40 font-medium">Selectable option</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PACKAGING_OPTIONS.map((pkg) => {
            const isSelected = selectedPackaging === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackaging(pkg.id)}
                className={`relative p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex gap-3 items-center ${
                  isSelected
                    ? 'border-[#8B2632] bg-[#F5E6E8]/30 shadow-xs'
                    : 'border-black/10 bg-white hover:border-black/20'
                }`}
              >
                <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-black/5 bg-[#F9F9F9]">
                  <Image src={pkg.image} alt={pkg.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h5 className="text-xs font-bold text-black/90 truncate uppercase tracking-tight">{pkg.name}</h5>
                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-[#8B2632] text-white flex items-center justify-center shrink-0">
                        <Check size={10} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <span className={`text-xs font-bold block mt-0.5 ${pkg.price > 0 ? 'text-[#8B2632]' : 'text-green-700'}`}>
                    {pkg.priceLabel}
                  </span>
                  <p className="text-[9px] text-black/50 truncate mt-0.5">{pkg.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {selectedPackaging === 'premium' && (
          <div className="space-y-2 bg-white p-4 rounded-2xl border border-[#8B2632]/20 animate-in fade-in duration-200">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-black/60">
              <span>Gift Message (Optional)</span>
              <span className={giftMessage.length >= 240 ? 'text-red-500' : 'text-black/40'}>
                {giftMessage.length}/250 characters
              </span>
            </div>
            <textarea
              value={giftMessage}
              maxLength={250}
              onChange={(e) => setGiftMessage(e.target.value.slice(0, 250))}
              placeholder="Write a personal message for the recipient..."
              rows={3}
              className="w-full p-3 bg-[#FAF8F3] border border-black/10 rounded-xl text-xs font-medium text-black outline-none focus:border-[#8B2632] placeholder:text-black/30 resize-none transition-colors"
            />
            <p className="text-[9px] text-black/40 italic">
              * We will print this message on a luxury keepsake card placed inside the box.
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center justify-between bg-[#F5E6E8]/50 border border-[#8B2632]/10 px-6 py-4 rounded-full w-full sm:w-40">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-[#8B2632] hover:scale-125 transition-transform cursor-pointer"><Minus size={18} /></button>
          <span className="font-bold text-lg text-[#8B2632]">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} className="text-[#8B2632] hover:scale-125 transition-transform cursor-pointer"><Plus size={18} /></button>
        </div>
        <button
          onClick={handleAdd}
          disabled={!canAdd}
          className={`w-full sm:flex-1 font-bold py-5 rounded-full text-[11px] uppercase tracking-[0.2em] transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:bg-gray-400 cursor-pointer ${
            isPreOrder ? 'bg-[#FF6B35] text-white hover:bg-black' : 'bg-[#8B2632] text-white hover:bg-black'
          }`}
        >
          {isVariable && !selectedVariation && !isHardSoldOut ? (
            'Select Options'
          ) : isHardSoldOut ? (
            'Sold Out'
          ) : isPreOrder ? (
            <> <Clock size={16} /> Pre-order Now </>
          ) : (
            <> <ShoppingBag size={16} /> Add to cart </>
          )}
        </button>
      </div>

      {isPreOrder && (
        <p className="text-[11px] text-[#FF6B35] font-bold uppercase tracking-widest flex items-center gap-2 bg-[#FF6B35]/5 p-4 rounded-2xl border border-[#FF6B35]/10">
          <Clock size={14} /> This item is available for pre-order and will ship once styled.
        </p>
      )}
      {isVariable && !selectedVariation && (
        <p className="text-[10px] text-[#8B2632] font-medium italic flex items-center gap-1">
          <AlertCircle size={12} /> Please select all options to see the final price.
        </p>
      )}
    </div>
  );
}
