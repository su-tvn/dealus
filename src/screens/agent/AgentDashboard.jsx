import React from 'react';
import { TrendingUp, Users, MessageSquare, ChevronRight, Coins, Bell, Building2, Package, Star } from 'lucide-react';
import { agentProfile } from '../../data/mockAgents';
import { agentContracts } from '../../data/mockAgentSuppliers';
import { commissionSummary } from '../../data/mockCommissions';
import { useApp } from '../../context/AppContext';

const RANK_GRADIENT = {
  Diamond: 'from-cyan-500 to-blue-600',
  Gold:    'from-amber-400 to-orange-500',
  Silver:  'from-gray-400 to-gray-600',
};

export default function AgentDashboard() {
  const { setActiveTab } = useApp();
  const agent = agentProfile;
  const activeContracts = agentContracts.filter(c => c.status === 'active').length;
  const cs = commissionSummary;

  const quickLinks = [
    { tab: 'agentSuppliers', icon: <Building2 size={20} className="text-blue-600" />, bg: 'bg-blue-100', label: 'Nhà cung cấp', sub: `${activeContracts} hợp đồng` },
    { tab: 'agentCatalog',   icon: <Package size={20} className="text-emerald-600" />, bg: 'bg-emerald-100', label: 'Danh mục', sub: '3 đang bán' },
    { tab: 'agentCommission',icon: <Coins size={20} className="text-amber-600" />, bg: 'bg-amber-100', label: 'Hoa hồng', sub: cs.thisMonth },
    { tab: 'agentTree',      icon: <Users size={20} className="text-purple-600" />, bg: 'bg-purple-100', label: 'Đội nhóm', sub: '6 agents' },
    { tab: 'chat',           icon: <MessageSquare size={20} className="text-rose-600" />, bg: 'bg-rose-100', label: 'Tin nhắn', sub: '4 chưa đọc' },
  ];

  return (
    <div className="flex flex-col gap-4 pb-6">

      {/* ── Merged profile header ── */}
      <div className={`bg-gradient-to-br ${RANK_GRADIENT[agent.rank] || 'from-gray-700 to-gray-900'} px-4 pt-12 pb-5 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="relative z-10 flex items-center gap-3">
          <img src={agent.avatar} alt={agent.name} className="w-14 h-14 rounded-2xl border-2 border-white/50 object-cover shadow-lg shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-wider text-white/70 mb-0.5">{agent.rank} Agent</div>
            <h2 className="text-lg font-black text-white leading-tight truncate">{agent.name}</h2>
            <p className="text-xs text-white/70 mt-0.5">{agent.role}</p>
          </div>
          <button className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shrink-0 relative">
            <Bell size={16} className="text-white" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full border border-white" />
          </button>
        </div>

        {/* KPI pills */}
        <div className="relative z-10 grid grid-cols-3 gap-2 mt-4">
          {[
            { label: 'Deals T.này', value: agent.totalDeal },
            { label: 'Doanh thu', value: agent.revenue },
            { label: 'Đánh giá', value: `${agent.rating} ★` },
          ].map((item, i) => (
            <div key={i} className="bg-white/15 backdrop-blur-sm rounded-xl p-2.5 text-center">
              <div className="text-base font-black text-white leading-tight">{item.value}</div>
              <div className="text-[10px] text-white/70 mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Commission snapshot ── */}
      <div className="px-4">
        <button
          onClick={() => setActiveTab('agentCommission')}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-4 flex items-center justify-between shadow-lg shadow-indigo-500/20"
        >
          <div className="text-left">
            <div className="text-xs text-indigo-200 font-medium mb-0.5">Hoa hồng tháng này</div>
            <div className="text-2xl font-black text-white">{cs.thisMonth}</div>
            <div className="text-xs text-indigo-200 mt-0.5">Chờ nhận: <span className="text-amber-300 font-bold">{cs.pending}</span></div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="bg-white/20 rounded-full p-2">
              <TrendingUp size={18} className="text-white" />
            </div>
            <span className="text-xs text-white/80 flex items-center gap-0.5">Xem chi tiết <ChevronRight size={12} /></span>
          </div>
        </button>
      </div>

      {/* ── Quick links grid ── */}
      <div className="px-4">
        <h3 className="font-bold text-gray-800 text-sm mb-3">Công cụ</h3>
        <div className="grid grid-cols-3 gap-3">
          {quickLinks.map(q => (
            <button
              key={q.tab}
              onClick={() => setActiveTab(q.tab)}
              className="bg-white border border-gray-100 rounded-2xl p-3 flex flex-col items-center gap-2 shadow-sm hover:bg-gray-50 transition-colors"
            >
              <div className={`w-10 h-10 ${q.bg} rounded-xl flex items-center justify-center`}>
                {q.icon}
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-900 text-xs leading-tight">{q.label}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">{q.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Active contracts summary ── */}
      <div className="px-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-800 text-sm">Đối tác đang hợp tác</h3>
          <button onClick={() => setActiveTab('agentSuppliers')} className="text-xs text-blue-600 font-bold flex items-center gap-0.5">
            Xem tất cả <ChevronRight size={12} />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {agentContracts.filter(c => c.status === 'active').map(c => (
            <div key={c.contractId} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm flex items-center gap-3">
              <img src={c.logo} alt={c.supplierName} className="w-10 h-10 rounded-xl border border-gray-100 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-900 text-sm truncate">{c.supplierName}</div>
                <div className="text-[11px] text-gray-500">{c.category} · {c.totalOrders} đơn</div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-black text-emerald-600 text-sm">{c.totalRevenue}</div>
                <div className="text-[10px] text-blue-600 font-bold">HH {c.commissionRates.default}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Team tree CTA ── */}
      <div className="px-4">
        <button
          onClick={() => setActiveTab('agentTree')}
          className="w-full bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Users size={18} className="text-white" />
            </div>
            <div className="text-left">
              <div className="font-bold text-gray-900 text-sm">Cây đội nhóm Agent</div>
              <div className="text-[11px] text-gray-500">Xem và quản lý toàn bộ mạng lưới</div>
            </div>
          </div>
          <ChevronRight size={18} className="text-gray-400" />
        </button>
      </div>

    </div>
  );
}
