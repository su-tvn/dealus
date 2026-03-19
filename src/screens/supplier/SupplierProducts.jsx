import React from 'react';
import { ArrowLeft, Plus, Package, AlertCircle } from 'lucide-react';
import { supplierProducts } from '../../data/mockSupplier';
import { useApp } from '../../context/AppContext';

const STATUS_CONFIG = {
  active: { label: 'Đang bán', color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
  out_of_stock: { label: 'Hết hàng', color: 'text-red-600 bg-red-50 border-red-100' },
  draft: { label: 'Nháp', color: 'text-gray-500 bg-gray-100 border-gray-200' },
};

export default function SupplierProducts() {
  const { setActiveTab } = useApp();

  return (
    <div className="flex flex-col min-h-full">

      {/* Header */}
      <div className="bg-white px-4 pt-6 pb-4 shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => setActiveTab('home')} className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
            <ArrowLeft size={18} className="text-gray-700" />
          </button>
          <div className="flex-1">
            <h2 className="font-black text-xl text-gray-900">Kho sản phẩm</h2>
            <p className="text-[11px] text-gray-500 font-medium">{supplierProducts.length} sản phẩm</p>
          </div>
          <button className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center shadow-md shadow-blue-500/30">
            <Plus size={18} className="text-white" />
          </button>
        </div>

        {/* Status filter */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {['Tất cả', 'Đang bán', 'Hết hàng'].map((f, i) => (
            <button key={i} className={`flex-none px-4 py-1.5 rounded-full text-xs font-bold border ${i === 0 ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Product list */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {supplierProducts.map(product => {
          const status = STATUS_CONFIG[product.status] || STATUS_CONFIG.draft;
          const isLowStock = product.stock > 0 && product.stock <= 5;

          return (
            <div key={product.id} className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm flex items-center gap-3">
              <img src={product.img} alt={product.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 text-sm line-clamp-2 leading-tight mb-1">{product.name}</h4>
                <div className="text-blue-600 font-bold text-sm mb-1.5">{product.price}</div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] font-bold border px-2 py-0.5 rounded-full ${status.color}`}>
                    {status.label}
                  </span>
                  <span className="text-[10px] text-gray-500 flex items-center gap-0.5">
                    <Package size={10} /> Kho: {product.stock}
                  </span>
                  {isLowStock && (
                    <span className="text-[10px] text-amber-600 flex items-center gap-0.5 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100">
                      <AlertCircle size={10} /> Gần hết
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[10px] text-gray-400 font-medium">Đã bán</div>
                <div className="font-black text-gray-900 text-base">{product.sold}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
