import React, { useState } from 'react';
import { ArrowLeft, Share2, Plus, Check, Tag } from 'lucide-react';
import { useApp } from '../../context/AppContext';

// Products from the agent's contracted suppliers combined
const CATALOG_PRODUCTS = [
  {
    id: 1,
    name: 'Robot hút bụi Xiaomi Vacuum X10',
    supplierName: 'Shop Điện Máy 247',
    supplierColor: 'bg-blue-100 text-blue-700',
    wholesalePrice: '6.900.000đ',
    retailPrice: '7.990.000đ',
    commissionRate: 12,
    commissionAmount: '958.800đ',
    stock: 14,
    inMyCatalog: true,
    img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 2,
    name: 'Smart TV LG 4K 55 inch',
    supplierName: 'Shop Điện Máy 247',
    supplierColor: 'bg-blue-100 text-blue-700',
    wholesalePrice: '8.500.000đ',
    retailPrice: '9.900.000đ',
    commissionRate: 10,
    commissionAmount: '990.000đ',
    stock: 6,
    inMyCatalog: true,
    img: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 3,
    name: 'Tủ lạnh Samsung Inverter 400L',
    supplierName: 'Shop Điện Máy 247',
    supplierColor: 'bg-blue-100 text-blue-700',
    wholesalePrice: '10.800.000đ',
    retailPrice: '12.300.000đ',
    commissionRate: 9,
    commissionAmount: '1.107.000đ',
    stock: 3,
    inMyCatalog: false,
    img: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 4,
    name: 'Sofa góc chữ L HomeStyle 2.0m',
    supplierName: 'Nội Thất HomeStyle',
    supplierColor: 'bg-emerald-100 text-emerald-700',
    wholesalePrice: '10.800.000đ',
    retailPrice: '12.500.000đ',
    commissionRate: 11,
    commissionAmount: '1.375.000đ',
    stock: 8,
    inMyCatalog: true,
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 5,
    name: 'Giường ngủ gỗ óc chó Queen 1m6',
    supplierName: 'Nội Thất HomeStyle',
    supplierColor: 'bg-emerald-100 text-emerald-700',
    wholesalePrice: '14.200.000đ',
    retailPrice: '16.800.000đ',
    commissionRate: 12,
    commissionAmount: '2.016.000đ',
    stock: 4,
    inMyCatalog: false,
    img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 6,
    name: 'Máy lọc không khí Dyson V12',
    supplierName: 'Shop Điện Máy 247',
    supplierColor: 'bg-blue-100 text-blue-700',
    wholesalePrice: '13.000.000đ',
    retailPrice: '15.000.000đ',
    commissionRate: 12,
    commissionAmount: '1.800.000đ',
    stock: 0,
    inMyCatalog: false,
    img: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=300&q=80',
  },
];

function ProductCard({ p, onToggle, onShare }) {
  return (
    <div className={`bg-white border rounded-2xl shadow-sm overflow-hidden ${p.stock === 0 ? 'opacity-60' : 'border-gray-100'}`}>
      <div className="relative">
        <img src={p.img} alt={p.name} className="w-full h-40 object-cover" />
        {p.stock === 0 && (
          <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
            <span className="text-white text-xs font-bold bg-gray-800/80 px-3 py-1 rounded-full">Hết hàng</span>
          </div>
        )}
        <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${p.supplierColor}`}>
          {p.supplierName}
        </span>
      </div>

      <div className="p-3">
        <h4 className="font-bold text-gray-900 text-sm line-clamp-2 leading-tight mb-2">{p.name}</h4>

        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-blue-600 font-black text-base">{p.retailPrice}</div>
            <div className="text-[10px] text-gray-400 line-through">{p.wholesalePrice} giá sỉ</div>
          </div>
          <div className="text-right">
            <div className="text-emerald-600 font-black text-sm">{p.commissionAmount}</div>
            <div className="flex items-center gap-0.5 justify-end">
              <Tag size={9} className="text-emerald-500" />
              <span className="text-[10px] text-emerald-600 font-bold">HH {p.commissionRate}%</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onToggle(p.id)}
            disabled={p.stock === 0}
            className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${
              p.inMyCatalog
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                : 'bg-blue-600 text-white shadow-sm shadow-blue-500/30 hover:bg-blue-700'
            }`}
          >
            {p.inMyCatalog ? <><Check size={12} /> Đang bán</> : <><Plus size={12} /> Thêm vào DS</>}
          </button>
          <button
            onClick={() => onShare(p)}
            className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors shrink-0"
          >
            <Share2 size={15} className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AgentCatalog() {
  const { setActiveTab } = useApp();
  const [products, setProducts] = useState(CATALOG_PRODUCTS);
  const [filter, setFilter] = useState('all'); // all | mine

  const toggleCatalog = (id) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, inMyCatalog: !p.inMyCatalog } : p));
  };

  const handleShare = (p) => {
    // In a real app this would copy a tracking link
    alert(`Link chia sẻ: https://dealus.vn/p/${p.id}?ref=agent10`);
  };

  const displayed = filter === 'mine' ? products.filter(p => p.inMyCatalog) : products;
  const myCount = products.filter(p => p.inMyCatalog).length;

  return (
    <div className="flex flex-col min-h-full">

      {/* Header */}
      <div className="bg-white px-4 pt-10 pb-0 shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setActiveTab('home')} className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
            <ArrowLeft size={18} className="text-gray-700" />
          </button>
          <div className="flex-1">
            <h2 className="font-black text-xl text-gray-900">Danh mục bán hàng</h2>
            <p className="text-[11px] text-gray-500 font-medium">{myCount} sản phẩm đang bán · {products.length} khả dụng</p>
          </div>
        </div>

        <div className="flex border-b border-gray-100">
          {[
            { key: 'all', label: 'Tất cả sản phẩm' },
            { key: 'mine', label: `Đang bán (${myCount})` },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${
                filter === t.key ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 bg-gray-50 px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          {displayed.map(p => (
            <ProductCard key={p.id} p={p} onToggle={toggleCatalog} onShare={handleShare} />
          ))}
        </div>
        {displayed.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="font-bold text-sm">Chưa có sản phẩm nào</p>
            <p className="text-xs mt-1">Thêm sản phẩm từ tab Tất cả</p>
          </div>
        )}
      </div>
    </div>
  );
}
