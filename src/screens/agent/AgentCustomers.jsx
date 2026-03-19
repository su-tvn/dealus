import React, { useState, useMemo } from 'react';
import {
  Search, Plus, Phone, MessageCircle, Clock, ChevronRight,
  Star, Users, Bell, Filter
} from 'lucide-react';
import { mockLeads, HEAT_CONFIG, LEAD_STAGES, SOURCE_CONFIG } from '../../data/mockLeads';
import { mockCustomers, STATUS_CONFIG } from '../../data/mockCustomers';
import { useApp } from '../../context/AppContext';

function formatCurrency(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0', '') + ' tr';
  if (n >= 1000) return (n / 1000).toFixed(0) + 'k';
  return n.toLocaleString('vi-VN');
}

function formatDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  const today = new Date('2026-03-19');
  const diff = Math.round((today - d) / 86400000);
  if (diff === 0) return 'Hôm nay';
  if (diff === 1) return 'Hôm qua';
  if (diff < 0) {
    const absDiff = Math.abs(diff);
    if (absDiff === 1) return 'Ngày mai';
    return `${absDiff} ngày nữa`;
  }
  if (diff < 7) return `${diff} ngày trước`;
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
}

function isOverdue(dateStr) {
  if (!dateStr) return false;
  return new Date(dateStr) < new Date('2026-03-19');
}

function isDueSoon(dateStr) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const today = new Date('2026-03-19');
  const tomorrow = new Date('2026-03-20');
  return d >= today && d <= tomorrow;
}

// ── Lead Card ──────────────────────────────────────────────────────────────
function LeadCard({ lead, onChat }) {
  const heat = HEAT_CONFIG[lead.heat];
  const stage = LEAD_STAGES.find(s => s.key === lead.stage);
  const source = SOURCE_CONFIG[lead.source];
  const overdue = isOverdue(lead.followUpAt);
  const dueSoon = isDueSoon(lead.followUpAt);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-3">
      {/* Row 1: avatar + name + heat + stage */}
      <div className="flex items-start gap-3">
        <div className="relative flex-shrink-0">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-bold text-base">
            {lead.name.charAt(0)}
          </div>
          {lead.unread > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {lead.unread}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-gray-900 text-sm">{lead.name}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${heat.color}`}>
              {heat.emoji} {heat.label}
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
            {stage && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${stage.color}`}>
                {stage.label}
              </span>
            )}
            {source && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${source.color}`}>
                {source.label}
              </span>
            )}
          </div>
        </div>

        <button
          className="flex-shrink-0 w-9 h-9 rounded-full bg-teal-50 flex items-center justify-center"
          onClick={() => onChat(lead)}
        >
          <MessageCircle size={17} className="text-teal-600" />
        </button>
      </div>

      {/* Interest */}
      {lead.interest && (
        <p className="text-xs text-gray-500 mt-2 ml-14 leading-relaxed">
          💡 {lead.interest}
        </p>
      )}

      {/* Last message */}
      {lead.lastMessage && (
        <p className="text-xs text-gray-400 mt-1 ml-14 truncate italic">
          "{lead.lastMessage}"
        </p>
      )}

      {/* Row bottom: follow-up + budget */}
      <div className="flex items-center justify-between mt-2.5 ml-14">
        <div className="flex items-center gap-1">
          {lead.followUpAt ? (
            <span className={`flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
              overdue ? 'bg-red-100 text-red-600' :
              dueSoon ? 'bg-amber-100 text-amber-700' :
              'bg-gray-100 text-gray-500'
            }`}>
              <Bell size={10} />
              {overdue ? 'Quá hạn · ' : ''}{formatDate(lead.followUpAt)}
            </span>
          ) : (
            <span className="text-[11px] text-gray-400">Chưa đặt nhắc</span>
          )}
        </div>
        {lead.budget > 0 && (
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            ≈ {formatCurrency(lead.budget)}
          </span>
        )}
      </div>
    </div>
  );
}

// ── Customer Card ──────────────────────────────────────────────────────────
function CustomerCard({ customer, onChat }) {
  const statusCfg = STATUS_CONFIG[customer.status];
  const overdue = isOverdue(customer.followUpAt);
  const dueSoon = isDueSoon(customer.followUpAt);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-3">
      <div className="flex items-start gap-3">
        <div className="relative flex-shrink-0">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-bold text-base">
            {customer.name.charAt(0)}
          </div>
          {customer.unread > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {customer.unread}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-gray-900 text-sm">{customer.name}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${statusCfg.color}`}>
              {statusCfg.label}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-0.5">
            <span className="text-[11px] text-gray-500">{customer.totalOrders} đơn</span>
            <span className="text-[11px] font-semibold text-emerald-700">{formatCurrency(customer.totalSpent)}</span>
            {customer.lastContact && (
              <span className="text-[11px] text-gray-400">{formatDate(customer.lastContact)}</span>
            )}
          </div>
        </div>

        <button
          className="flex-shrink-0 w-9 h-9 rounded-full bg-teal-50 flex items-center justify-center"
          onClick={() => onChat(customer)}
        >
          <MessageCircle size={17} className="text-teal-600" />
        </button>
      </div>

      {/* Last message */}
      {customer.lastMessage && (
        <p className="text-xs text-gray-400 mt-2 ml-14 truncate italic">
          "{customer.lastMessage}"
        </p>
      )}

      {/* Notes + follow-up */}
      {customer.notes && (
        <p className="text-xs text-gray-500 mt-1.5 ml-14 leading-relaxed line-clamp-1">
          📝 {customer.notes}
        </p>
      )}

      {customer.followUpAt && (
        <div className="mt-2 ml-14">
          <span className={`flex items-center gap-1 w-fit text-[11px] font-medium px-2 py-0.5 rounded-full ${
            overdue ? 'bg-red-100 text-red-600' :
            dueSoon ? 'bg-amber-100 text-amber-700' :
            'bg-gray-100 text-gray-500'
          }`}>
            <Bell size={10} />
            {overdue ? 'Quá hạn · ' : 'Nhắc · '}{formatDate(customer.followUpAt)}
          </span>
        </div>
      )}
    </div>
  );
}

// ── Main Screen ────────────────────────────────────────────────────────────
export default function AgentCustomers() {
  const { setActiveTab } = useApp();
  const [tab, setTab] = useState('leads');        // leads | customers
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [heatFilter, setHeatFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredLeads = useMemo(() => {
    let items = mockLeads.filter(l => l.stage !== 'won' && l.stage !== 'lost');
    if (search) items = items.filter(l =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) ||
      (l.interest && l.interest.toLowerCase().includes(search.toLowerCase()))
    );
    if (heatFilter !== 'all') items = items.filter(l => l.heat === heatFilter);
    return items.sort((a, b) => {
      const heatOrder = { hot: 0, warm: 1, cold: 2, dormant: 3 };
      return heatOrder[a.heat] - heatOrder[b.heat];
    });
  }, [search, heatFilter]);

  const filteredCustomers = useMemo(() => {
    let items = [...mockCustomers];
    if (search) items = items.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
    );
    if (statusFilter !== 'all') items = items.filter(c => c.status === statusFilter);
    return items.sort((a, b) => {
      if (a.unread !== b.unread) return b.unread - a.unread;
      return b.totalSpent - a.totalSpent;
    });
  }, [search, statusFilter]);

  function handleChat(person) {
    setActiveTab('chat');
  }

  return (
    <div className="flex flex-col min-h-full bg-gray-50">

      {/* ── Header ── */}
      <div className="bg-gradient-to-br from-teal-600 to-cyan-700 px-5 pt-12 pb-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white font-bold text-xl">Khách hàng</h1>
            <p className="text-teal-100 text-xs mt-0.5">Lead & Chăm sóc khách hàng</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${searchOpen ? 'bg-white text-teal-600' : 'bg-white/20 text-white'}`}
              onClick={() => { setSearchOpen(v => !v); if (searchOpen) setSearch(''); }}
            >
              <Search size={18} />
            </button>
            <button
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
              onClick={() => {/* add lead */}}
            >
              <Plus size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Collapsible search */}
        {searchOpen && (
          <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2.5 mt-3">
            <Search size={16} className="text-gray-400 flex-shrink-0" />
            <input
              autoFocus
              className="flex-1 text-sm bg-transparent outline-none text-gray-800 placeholder-gray-400"
              placeholder="Tìm theo tên, SĐT, sản phẩm..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-gray-400">
                ✕
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Tab bar ── */}
      <div className="bg-white border-b border-gray-100 px-5 flex gap-1 pt-2">
        <button
          onClick={() => setTab('leads')}
          className={`flex-1 py-2.5 text-sm font-semibold rounded-t-lg transition-colors ${
            tab === 'leads' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500'
          }`}
        >
          Lead tiềm năng
          <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
            tab === 'leads' ? 'bg-teal-100 text-teal-600' : 'bg-gray-100 text-gray-500'
          }`}>{filteredLeads.length}</span>
        </button>
        <button
          onClick={() => setTab('customers')}
          className={`flex-1 py-2.5 text-sm font-semibold rounded-t-lg transition-colors ${
            tab === 'customers' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500'
          }`}
        >
          Khách hàng
          <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
            tab === 'customers' ? 'bg-teal-100 text-teal-600' : 'bg-gray-100 text-gray-500'
          }`}>{filteredCustomers.length}</span>
        </button>
      </div>

      {/* ── Filter chips ── */}
      {tab === 'leads' && (
        <div className="bg-white px-4 py-2 flex gap-2 overflow-x-auto hide-scrollbar">
          {[
            { key: 'all', label: 'Tất cả' },
            { key: 'hot', label: '🔥 Nóng' },
            { key: 'warm', label: '🌡️ Ấm' },
            { key: 'cold', label: '❄️ Lạnh' },
            { key: 'dormant', label: '💤 Ngủ đông' },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setHeatFilter(f.key)}
              className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                heatFilter === f.key
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {tab === 'customers' && (
        <div className="bg-white px-4 py-2 flex gap-2 overflow-x-auto hide-scrollbar">
          {[
            { key: 'all', label: 'Tất cả' },
            { key: 'vip', label: 'VIP' },
            { key: 'loyal', label: 'Thân thiết' },
            { key: 'warm', label: 'Tiềm năng' },
            { key: 'new', label: 'Mới' },
            { key: 'inactive', label: 'Không hoạt động' },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setStatusFilter(f.key)}
              className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                statusFilter === f.key
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {/* ── Content ── */}
      <div className="flex-1 px-4 pt-3 pb-6">

        {tab === 'leads' && (
          <>
            {filteredLeads.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <Users size={40} className="mx-auto mb-3 opacity-30" />
                <p className="font-medium">Không có lead nào</p>
                <p className="text-sm mt-1">Nhấn + để thêm lead mới</p>
              </div>
            ) : (
              filteredLeads.map(lead => (
                <LeadCard key={lead.id} lead={lead} onChat={handleChat} />
              ))
            )}

            {/* Pipeline summary */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 mt-1">
              <p className="text-xs font-semibold text-gray-500 mb-3">PIPELINE TỔNG QUAN</p>
              <div className="flex gap-1">
                {LEAD_STAGES.filter(s => s.key !== 'won' && s.key !== 'lost').map(stage => {
                  const count = mockLeads.filter(l => l.stage === stage.key).length;
                  return (
                    <div key={stage.key} className="flex-1 text-center">
                      <div className={`text-sm font-bold ${count > 0 ? 'text-gray-800' : 'text-gray-300'}`}>{count}</div>
                      <div className={`h-1.5 rounded-full mt-1 mb-1.5 ${count > 0 ? 'bg-teal-400' : 'bg-gray-100'}`} />
                      <div className="text-[9px] text-gray-400 leading-tight">{stage.label.replace('Đang liên hệ', 'Liên hệ').replace('Chờ quyết định', 'Suy nghĩ').replace('Đã tư vấn', 'Tư vấn')}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {tab === 'customers' && (
          <>
            {filteredCustomers.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <Users size={40} className="mx-auto mb-3 opacity-30" />
                <p className="font-medium">Không có khách hàng</p>
              </div>
            ) : (
              filteredCustomers.map(customer => (
                <CustomerCard key={customer.id} customer={customer} onChat={handleChat} />
              ))
            )}

            {/* Summary stats */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 mt-1">
              <p className="text-xs font-semibold text-gray-500 mb-3">TỔNG QUAN KHÁCH HÀNG</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-800">{mockCustomers.length}</div>
                  <div className="text-[10px] text-gray-500">Tổng khách</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-emerald-600">
                    {formatCurrency(mockCustomers.reduce((s, c) => s + c.totalSpent, 0))}
                  </div>
                  <div className="text-[10px] text-gray-500">Tổng doanh thu</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-rose-600">
                    {mockCustomers.filter(c => c.status === 'inactive').length}
                  </div>
                  <div className="text-[10px] text-gray-500">Cần tái kích hoạt</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
