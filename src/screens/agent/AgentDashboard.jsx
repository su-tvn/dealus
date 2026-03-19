import React from 'react';
import { Star, TrendingUp, Users, MessageSquare, ChevronRight, Coins, Bell } from 'lucide-react';
import { agentProfile } from '../../data/mockAgents';
import { useApp } from '../../context/AppContext';

const RANK_COLORS = {
  Diamond: 'from-cyan-400 to-blue-500',
  Gold: 'from-amber-400 to-orange-500',
  Silver: 'from-gray-300 to-gray-400',
};

export default function AgentDashboard() {
  const { setActiveTab } = useApp();
  const agent = agentProfile;

  const stats = [
    { label: 'Deals thành công', value: agent.totalDeal, icon: <TrendingUp size={18} className="text-emerald-500" />, bg: 'bg-emerald-50' },
    { label: 'Doanh thu', value: agent.revenue, icon: <Coins size={18} className="text-amber-500" />, bg: 'bg-amber-50' },
    { label: 'Đánh giá', value: `${agent.rating} ★`, icon: <Star size={18} className="text-yellow-500" />, bg: 'bg-yellow-50' },
    { label: 'Đánh giá', value: `${agent.reviews} lượt`, icon: <Users size={18} className="text-blue-500" />, bg: 'bg-blue-50' },
  ];

  return (
    <div className="flex flex-col gap-5 pb-6">

      {/* Agent profile card */}
      <div className="px-4 pt-6">
        <div className={`bg-gradient-to-br ${RANK_COLORS[agent.rank] || 'from-gray-700 to-gray-900'} rounded-3xl p-5 text-white shadow-xl relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 flex items-center gap-4">
            <img src={agent.avatar} alt={agent.name} className="w-16 h-16 rounded-2xl border-2 border-white/50 object-cover shadow-lg" />
            <div className="flex-1">
              <div className="text-[11px] font-bold uppercase tracking-wider opacity-80 mb-0.5">{agent.rank} Agent</div>
              <h2 className="text-xl font-black leading-tight">{agent.name}</h2>
              <p className="text-sm opacity-75 mt-0.5">{agent.role}</p>
            </div>
            <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center relative">
              <Bell size={18} className="text-white" />
              <span className="absolute top-0 right-0 w-3 h-3 bg-rose-500 rounded-full border border-white" />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 relative z-10">
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-xl font-black">{agent.totalDeal}</div>
              <div className="text-[11px] opacity-80 mt-0.5">Deals tháng này</div>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-xl font-black">{agent.revenue}</div>
              <div className="text-[11px] opacity-80 mt-0.5">Doanh thu</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="px-4">
        <h3 className="font-bold text-gray-800 text-base mb-3">Thao tác nhanh</h3>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => setActiveTab('chat')} className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-3 shadow-sm hover:bg-blue-50 hover:border-blue-200 transition-colors text-left">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
              <MessageSquare size={18} className="text-blue-600" />
            </div>
            <div>
              <div className="font-bold text-gray-900 text-sm">Tin nhắn</div>
              <div className="text-[11px] text-gray-500">4 chưa đọc</div>
            </div>
          </button>

          <button onClick={() => setActiveTab('agentTree')} className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-3 shadow-sm hover:bg-emerald-50 hover:border-emerald-200 transition-colors text-left">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
              <Users size={18} className="text-emerald-600" />
            </div>
            <div>
              <div className="font-bold text-gray-900 text-sm">Đội nhóm</div>
              <div className="text-[11px] text-gray-500">3 agents</div>
            </div>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4">
        <h3 className="font-bold text-gray-800 text-base mb-3">Hiệu suất tháng này</h3>
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

      {/* View team tree CTA */}
      <div className="px-4">
        <button
          onClick={() => setActiveTab('agentTree')}
          className="w-full bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
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
