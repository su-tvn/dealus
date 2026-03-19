import React, { useState } from 'react';
import { TrendingUp, Package, ShoppingCart, Coins, Bell, ChevronRight, Plus } from 'lucide-react';
import { supplierProfile, supplierOrders } from '../../data/mockSupplier';
import { useApp } from '../../context/AppContext';

const ORDER_STATUS = {
  delivered: { label: 'Đã giao', color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
  shipping:  { label: 'Đang giao', color: 'text-blue-600 bg-blue-50 border-blue-100' },
  processing:{ label: 'Xử lý', color: 'text-amber-600 bg-amber-50 border-amber-100' },
  cancelled: { label: 'Huỷ', color: 'text-red-600 bg-red-50 border-red-100' },
};

const CHART_DATA = {
  day: [
    { label: 'T2', value: 12 },
    { label: 'T3', value: 19 },
    { label: 'T4', value: 8 },
    { label: 'T5', value: 24 },
    { label: 'T6', value: 31 },
    { label: 'T7', value: 27 },
    { label: 'CN', value: 15 },
  ],
  month: [
    { label: 'T1', value: 42 },
    { label: 'T2', value: 58 },
    { label: 'T3', value: 35 },
    { label: 'T4', value: 71 },
    { label: 'T5', value: 64 },
    { label: 'T6', value: 88 },
  ],
};

function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.value));
  const topIdx = data.reduce((best, d, i) => (d.value > data[best].value ? i : best), 0);
  return (
    <div className="flex items-end justify-between gap-1.5 h-28 mt-3">
      {data.map((d, i) => {
        const pct = Math.round((d.value / max) * 100);
        const isTop = i === topIdx;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <span className={`text-[10px] font-bold ${isTop ? 'text-blue-600' : 'text-transparent'}`}>{d.value}</span>
            <div className="w-full flex items-end" style={{ height: '68px' }}>
              <div
                className={`w-full rounded-t-lg transition-all duration-500 ${isTop ? 'bg-blue-500' : 'bg-blue-100'}`}
                style={{ height: `${pct}%` }}
              />
            </div>
            <span className="text-[10px] text-gray-400 font-medium">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function SupplierDashboard() {
  const { setActiveTab } = useApp();
  const supplier = supplierProfile;
  const [chartMode, setChartMode] = useState('day');

  const stats = [
    { label: 'Sản phẩm', value: supplier.totalProducts, icon: <Package size={16} className="text-blue-500" />, bg: 'bg-blue-50' },
    { label: 'Đơn hàng',  value: supplier.totalOrders,   icon: <ShoppingCart size={16} className="text-emerald-500" />, bg: 'bg-emerald-50' },
    { label: 'Doanh thu', value: supplier.revenue,        icon: <TrendingUp size={16} className="text-amber-500" />, bg: 'bg-amber-50' },
  ];

  return (
    <div className="flex flex-col gap-4 pb-6">

      {/* ── Merged header (replaces AppHeader + old profile card) ── */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 px-4 pt-12 pb-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 shadow-lg flex items-center justify-center text-xl font-black text-white shrink-0">
            {supplier.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-wider text-blue-200 mb-0.5">{supplier.category}</div>
            <h2 className="text-base font-black text-white leading-tight truncate">{supplier.name}</h2>
            <p className="text-xs text-blue-200 mt-0.5">{supplier.owner}</p>
          </div>
          <button className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shrink-0">
            <Bell size={16} className="text-white" />
          </button>
        </div>
        <div className="relative z-10 mt-4 bg-white/15 backdrop-blur-sm rounded-xl px-3 py-2.5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Coins size={14} className="text-amber-300" />
            <span className="text-sm font-bold text-white">{supplier.coins} Xu tích luỹ</span>
          </div>
          {supplier.verified && (
            <span className="text-[11px] font-bold bg-emerald-400/30 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-400/40">
              ✓ Đã xác minh
            </span>
          )}
        </div>
      </div>

      {/* ── 3 stats, one row ── */}
      <div className="px-4">
        <div className="grid grid-cols-3 gap-2">
          {stats.map((s, i) => (
            <div key={i} className={`${s.bg} rounded-2xl p-3 flex flex-col items-center gap-1.5 border border-white`}>
              <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm">
                {s.icon}
              </div>
              <div className="font-black text-gray-900 text-base leading-none">{s.value}</div>
              <div className="text-[10px] text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Sales bar chart ── */}
      <div className="px-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-800 text-sm">Doanh số bán hàng</h3>
              <p className="text-[10px] text-gray-400 mt-0.5">{chartMode === 'day' ? 'Tuần này' : '6 tháng gần nhất'}</p>
            </div>
            <div className="flex bg-gray-100 rounded-lg p-0.5">
              {['day', 'month'].map(m => (
                <button
                  key={m}
                  onClick={() => setChartMode(m)}
                  className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all ${
                    chartMode === m ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'
                  }`}
                >
                  {m === 'day' ? 'Ngày' : 'Tháng'}
                </button>
              ))}
            </div>
          </div>
          <BarChart data={CHART_DATA[chartMode]} />
        </div>
      </div>

      {/* ── Recent orders ── */}
      <div className="px-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-800 text-sm">Đơn hàng gần đây</h3>
          <button onClick={() => setActiveTab('supplierProducts')} className="text-xs text-blue-600 font-bold flex items-center gap-0.5">
            Xem kho <ChevronRight size={12} />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {supplierOrders.map(order => {
            const status = ORDER_STATUS[order.status] || ORDER_STATUS.processing;
            return (
              <div key={order.id} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
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
            );
          })}
        </div>
      </div>

      {/* ── Add product CTA ── */}
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
