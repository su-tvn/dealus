import React from 'react';
import { TrendingUp, Package, ShoppingCart, Star, Coins, Bell, ChevronRight, Plus } from 'lucide-react';
import { supplierProfile, supplierOrders } from '../../data/mockSupplier';
import { useApp } from '../../context/AppContext';

const ORDER_STATUS = {
  delivered: { label: 'Đã giao', color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
  shipping: { label: 'Đang giao', color: 'text-blue-600 bg-blue-50 border-blue-100' },
  processing: { label: 'Xử lý', color: 'text-amber-600 bg-amber-50 border-amber-100' },
  cancelled: { label: 'Huỷ', color: 'text-red-600 bg-red-50 border-red-100' },
};

export default function SupplierDashboard() {
  const { setActiveTab } = useApp();
  const supplier = supplierProfile;

  const stats = [
    { label: 'Sản phẩm', value: supplier.totalProducts, icon: <Package size={18} className="text-blue-500" />, bg: 'bg-blue-50' },
    { label: 'Đơn hàng', value: supplier.totalOrders, icon: <ShoppingCart size={18} className="text-emerald-500" />, bg: 'bg-emerald-50' },
    { label: 'Doanh thu', value: supplier.revenue, icon: <TrendingUp size={18} className="text-amber-500" />, bg: 'bg-amber-50' },
    { label: 'Đánh giá', value: `${supplier.rating} ★`, icon: <Star size={18} className="text-yellow-500" />, bg: 'bg-yellow-50' },
  ];

  return (
    <div className="flex flex-col gap-5 pb-6">

      {/* Supplier profile card */}
      <div className="px-4 pt-6">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-5 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center border border-white/30 shadow-lg text-2xl font-black text-white">
              {supplier.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="text-[11px] font-bold uppercase tracking-wider opacity-80 mb-0.5">{supplier.category}</div>
              <h2 className="text-lg font-black leading-tight">{supplier.name}</h2>
              <p className="text-sm opacity-75 mt-0.5">{supplier.owner}</p>
            </div>
            <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center relative">
              <Bell size={18} className="text-white" />
            </button>
          </div>

          <div className="mt-4 bg-white/15 backdrop-blur-sm rounded-xl p-3 flex justify-between items-center relative z-10">
            <div className="flex items-center gap-2">
              <Coins size={16} className="text-amber-300" />
              <span className="font-bold text-white">{supplier.coins} Xu tích luỹ</span>
            </div>
            {supplier.verified && (
              <span className="text-[11px] font-bold bg-emerald-400/30 text-emerald-200 px-2 py-1 rounded-full border border-emerald-400/40">
                ✓ Đã xác minh
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4">
        <h3 className="font-bold text-gray-800 text-base mb-3">Tổng quan</h3>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s, i) => (
            <div key={i} className={`${s.bg} rounded-2xl p-3 flex items-center gap-3 border border-white`}>
              <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm">
                {s.icon}
              </div>
              <div>
                <div className="font-black text-gray-900 text-base leading-tight">{s.value}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent orders */}
      <div className="px-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-800 text-base">Đơn hàng gần đây</h3>
          <button onClick={() => setActiveTab('supplierProducts')} className="text-xs text-blue-600 font-bold flex items-center gap-0.5">
            Xem kho <ChevronRight size={12} />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {supplierOrders.map(order => {
            const status = ORDER_STATUS[order.status] || ORDER_STATUS.processing;
            return (
              <div key={order.id} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-gray-500">{order.id}</span>
                    <span className={`text-[10px] font-bold border px-2 py-0.5 rounded-full ${status.color}`}>{status.label}</span>
                  </div>
                  <p className="font-semibold text-sm text-gray-900 truncate">{order.product}</p>
                  <div className="flex justify-between mt-1">
                    <span className="text-[11px] text-gray-500">{order.buyer}</span>
                    <span className="text-[11px] font-bold text-blue-600">{order.amount}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add product CTA */}
      <div className="px-4">
        <button
          onClick={() => setActiveTab('supplierProducts')}
          className="w-full bg-blue-600 text-white rounded-2xl p-4 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors font-bold"
        >
          <Plus size={18} /> Thêm sản phẩm mới
        </button>
      </div>

    </div>
  );
}
