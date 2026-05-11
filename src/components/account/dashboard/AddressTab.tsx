"use client";
import { useState } from 'react';
import { MapPin, Edit2, CheckCircle, Loader2 } from 'lucide-react';

export default function AddressTab({ customer, onRefresh }: { customer: any, onRefresh: () => void }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const address = customer?.shipping;

  return (
    <div className="space-y-8 font-sans">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-burgundy uppercase tracking-tight">Shipping Address</h3>
      </div>

      {address?.address_1 ? (
        <div className="bg-white border border-black/[0.05] rounded-2xl p-8 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-1">
              <p className="text-lg font-bold text-ink">{address.first_name} {address.last_name}</p>
              <p className="text-ink/60">{address.address_1}</p>
              <p className="text-ink/60">{address.city}, {address.state}</p>
              <p className="text-ink/60">{address.phone}</p>
            </div>
            <button className="p-2 hover:bg-cream rounded-full transition-colors text-gold">
              <Edit2 size={18} />
            </button>
          </div>
          <div className="flex items-center gap-2 text-green-600 bg-green-50 w-fit px-4 py-2 rounded-full">
            <CheckCircle size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Default Shipping Address</span>
          </div>
        </div>
      ) : (
        <div className="py-12 text-center border-2 border-dashed border-black/5 rounded-2xl">
          <p className="text-ink/40 italic">No shipping address found.</p>
        </div>
      )}

      <button className="w-full md:w-auto bg-blush text-burgundy px-10 py-4 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-burgundy hover:text-white transition-all shadow-lg shadow-burgundy/5">
        {address?.address_1 ? 'Change Address' : 'Add New Address'}
      </button>
    </div>
  );
}
