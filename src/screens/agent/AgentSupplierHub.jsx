import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, CheckCircle, Clock, XCircle, Building2, Star, Users, Plus, FileText } from 'lucide-react';
import { agentContracts, discoverSuppliers } from '../../data/mockAgentSuppliers';
import { useApp } from '../../context/AppContext';

const STATUS_CONFIG = {
  active:     { label: 'Hiệu lực',   color: 'text-emerald-600 bg-emerald-50 border-emerald-200', icon: <CheckCircle size={11} /> },
  pending:    { label: 'Chờ duyệt',  color: 'text-amber-600 bg-amber-50 border-amber-200',       icon: <Clock size={11} /> },
  expired:    { label: 'Hết hạn',    color: 'text-gray-500 bg-gray-100 border-gray-200',          icon: <XCircle size={11} /> },
  terminated: { label: 'Chấm dứt',   color: 'text-red-600 bg-red-50 border-red-200',              icon: <XCircle size={11} /> },
};

function ContractCard({ c }) {
  const st = STATUS_CONFIG[c.status] || STATUS_CONFIG.pending;
  const defaultRate = c.commissionRates?.default ?? '—';
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <img src={c.logo} alt={c.supplierName} className="w-11 h-11 rounded-xl object-cover border border-gray-100" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-gray-900 text-sm truncate">{c.supplierName}</span>
            <span className={`flex items-center gap-0.5 text-[10px] font-bold border px-1.5 py-0.5 rounded-full ${st.color}`}>
              {st.icon} {st.label}
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-0.5">{c.category} · {c.ownerName}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-blue-50 rounded-xl p-2 text-center">
          <div className="font-black text-blue-700 text-sm">{defaultRate}%</div>
          <div className="text-[10px] text-gray-500 mt-0.5">Hoa hồng</div>
        </div>
        <div className="bg-emerald-50 rounded-xl p-2 text-center">
          <div className="font-black text-emerald-700 text-sm">{c.totalRevenue}</div>
          <div className="text-[10px] text-gray-500 mt-0.5">Doanh thu</div>
        </div>
        <div className="bg-amber-50 rounded-xl p-2 text-center">
          <div className="font-black text-amber-700 text-sm">{c.totalOrders}</div>
          <div className="text-[10px] text-gray-500 mt-0.5">Đơn hàng</div>
        </div>
      </div>

      {c.status === 'active' && (
        <div className="flex items-center justify-between text-[11px] text-gray-400 border-t border-gray-50 pt-2">
          <span className="flex items-center gap-1"><FileText size={11} /> HĐ #{c.contractId}</span>
          <span>HH: {c.signedAt} – {c.expiresAt}</span>
        </div>
      )}
      {c.status === 'pending' && (
        <div className="bg-amber-50 rounded-xl px-3 py-2 text-[11px] text-amber-700 font-medium">
          Đang chờ Supplier xác nhận yêu cầu hợp tác
        </div>
      )}
    </div>
  );
}

function DiscoverCard({ s }) {
  const [requested, setRequested] = useState(false);
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <img src={s.logo} alt={s.supplierName} className="w-11 h-11 rounded-xl object-cover border border-gray-100" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-bold text-gray-900 text-sm truncate">{s.supplierName}</span>
            {s.verified && (
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 px-1.5 py-0.5 rounded-full">✓ Xác minh</span>
            )}
          </div>
          <p className="text-[11px] text-gray-500 mt-0.5">{s.category}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-3 text-[11px] text-gray-500">
        <span className="flex items-center gap-1"><Star size={11} className="text-amber-400 fill-amber-400" /> {s.rating}</span>
        <span className="flex items-center gap-1"><Users size={11} className="text-blue-500" /> {s.totalAgents} agents</span>
        <span className="font-bold text-blue-600">HH {s.commissionDefault}%</span>
      </div>

      <button
        onClick={() => setRequested(true)}
        className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all ${
          requested
            ? 'bg-gray-100 text-gray-400 cursor-default'
            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20'
        }`}
      >
        {requested ? '✓ Đã gửi yêu cầu' : 'Gửi yêu cầu hợp tác'}
      </button>
    </div>
  );
}

export default function AgentSupplierHub() {
  const { setActiveTab } = useApp();
  const [tab, setTab] = useState('contracts');

  const activeCount = agentContracts.filter(c => c.status === 'active').length;

  return (
    <div className="flex flex-col min-h-full">

      {/* Header */}
      <div className="bg-white px-4 pt-10 pb-0 shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setActiveTab('home')} className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
            <ArrowLeft size={18} className="text-gray-700" />
          </button>
          <div className="flex-1">
            <h2 className="font-black text-xl text-gray-900">Đối tác & Hợp đồng</h2>
            <p className="text-[11px] text-gray-500 font-medium">{activeCount} nhà cung cấp đang hợp tác</p>
          </div>
          <button className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center">
            <Plus size={18} className="text-blue-600" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          {[
            { key: 'contracts', label: 'Hợp đồng của tôi' },
            { key: 'discover', label: 'Khám phá NCC' },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${
                tab === t.key ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-gray-50 px-4 py-4 flex flex-col gap-3">
        {tab === 'contracts' && (
          <>
            {agentContracts.map(c => <ContractCard key={c.contractId} c={c} />)}
          </>
        )}

        {tab === 'discover' && (
          <>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3 flex items-center gap-3">
              <Building2 size={20} className="text-blue-500 shrink-0" />
              <p className="text-[12px] text-blue-700 font-medium leading-snug">
                Kết nối với nhà cung cấp để nhận sản phẩm và bắt đầu kiếm hoa hồng ngay.
              </p>
            </div>
            {discoverSuppliers.map(s => <DiscoverCard key={s.supplierId} s={s} />)}
          </>
        )}
      </div>
    </div>
  );
}
