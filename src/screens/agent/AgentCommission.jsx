import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Coins, ArrowLeft, Wallet, ChevronRight } from 'lucide-react';
import { commissionSummary, commissions, withdrawHistory, commissionChart } from '../../data/mockCommissions';
import { useApp } from '../../context/AppContext';

const STATUS_CONFIG = {
  confirmed: { label: 'Xác nhận', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  pending:   { label: 'Đang chờ', color: 'text-amber-600 bg-amber-50 border-amber-200' },
  paid:      { label: 'Đã nhận',  color: 'text-blue-600 bg-blue-50 border-blue-200' },
};

const SOURCE_LABEL = {
  direct:     'Trực tiếp',
  override_l1: 'Override L1',
  override_l2: 'Override L2',
  bonus:       'Bonus KPI',
};

function MiniBarChart({ data }) {
  const max = Math.max(...data.map(d => d.value));
  const topIdx = data.reduce((best, d, i) => (d.value > data[best].value ? i : best), 0);
  return (
    <div className="flex items-end justify-between gap-1 h-20 mt-3">
      {data.map((d, i) => {
        const pct = Math.round((d.value / max) * 100);
        const isTop = i === topIdx;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex items-end" style={{ height: '56px' }}>
              <div
                className={`w-full rounded-t-md transition-all duration-500 ${isTop ? 'bg-indigo-500' : 'bg-indigo-100'}`}
                style={{ height: `${pct}%` }}
              />
            </div>
            <span className="text-[9px] text-gray-400 font-medium">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function AgentCommission() {
  const { setActiveTab } = useApp();
  const [chartMode, setChartMode] = useState('month');
  const [showWithdraw, setShowWithdraw] = useState(false);

  const s = commissionSummary;
  const isGrowth = s.growthPct >= 0;

  return (
    <div className="flex flex-col min-h-full">

      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 px-4 pt-10 pb-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="relative z-10 flex items-center gap-3 mb-4">
          <button onClick={() => setActiveTab('home')} className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div>
            <h2 className="font-black text-xl text-white">Hoa hồng</h2>
            <p className="text-xs text-indigo-200 font-medium">Thu nhập của bạn từ Dealus</p>
          </div>
        </div>

        {/* Main commission stat */}
        <div className="relative z-10">
          <p className="text-xs text-indigo-200 font-medium mb-1">Tháng này</p>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-black text-white">{s.thisMonth}</span>
            <span className={`flex items-center gap-0.5 text-sm font-bold mb-1 ${isGrowth ? 'text-emerald-300' : 'text-red-300'}`}>
              {isGrowth ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {isGrowth ? '+' : ''}{s.growthPct}% so T.trước
            </span>
          </div>
        </div>

        {/* Stats row */}
        <div className="relative z-10 grid grid-cols-3 gap-2 mt-4">
          {[
            { label: 'Đang chờ', value: s.pending, color: 'text-amber-300' },
            { label: 'T.trước', value: s.lastMonth, color: 'text-indigo-200' },
            { label: 'Đã nhận', value: s.paid, color: 'text-emerald-300' },
          ].map((item, i) => (
            <div key={i} className="bg-white/15 backdrop-blur-sm rounded-xl p-2.5 text-center">
              <div className={`font-black text-sm ${item.color}`}>{item.value}</div>
              <div className="text-[10px] text-indigo-200 mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 bg-gray-50 flex flex-col gap-4 px-4 py-4">

        {/* Withdraw CTA */}
        <button
          onClick={() => setShowWithdraw(true)}
          className="w-full bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:bg-indigo-50 hover:border-indigo-200 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Wallet size={18} className="text-indigo-600" />
            </div>
            <div className="text-left">
              <div className="font-bold text-gray-900 text-sm">Rút tiền về tài khoản</div>
              <div className="text-[11px] text-gray-500">Vietcombank ****1234</div>
            </div>
          </div>
          <ChevronRight size={18} className="text-gray-400" />
        </button>

        {/* Chart */}
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-800 text-sm">Xu hướng thu nhập</h3>
              <p className="text-[10px] text-gray-400 mt-0.5">đơn vị: nghìn đồng</p>
            </div>
            <div className="flex bg-gray-100 rounded-lg p-0.5">
              {['day', 'month'].map(m => (
                <button
                  key={m}
                  onClick={() => setChartMode(m)}
                  className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all ${
                    chartMode === m ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-400'
                  }`}
                >
                  {m === 'day' ? 'Ngày' : 'Tháng'}
                </button>
              ))}
            </div>
          </div>
          <MiniBarChart data={commissionChart[chartMode]} />
        </div>

        {/* Commission list */}
        <div>
          <h3 className="font-bold text-gray-800 text-sm mb-3">Chi tiết giao dịch</h3>
          <div className="flex flex-col gap-2">
            {commissions.map(c => {
              const st = STATUS_CONFIG[c.status];
              return (
                <div key={c.id} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-gray-400">{c.date} · {c.id}</span>
                    <span className={`text-[10px] font-bold border px-2 py-0.5 rounded-full ${st.color}`}>{st.label}</span>
                  </div>
                  <p className="font-semibold text-sm text-gray-900 truncate">{c.product}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        c.source === 'direct' ? 'bg-blue-50 text-blue-600' :
                        c.source === 'override_l1' ? 'bg-purple-50 text-purple-600' :
                        c.source === 'override_l2' ? 'bg-pink-50 text-pink-600' :
                        'bg-amber-50 text-amber-600'
                      }`}>{SOURCE_LABEL[c.source]}</span>
                      <span className="text-[10px] text-gray-400">{c.rate}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Coins size={12} className="text-amber-500" />
                      <span className="text-sm font-black text-gray-900">
                        {c.amount.toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Withdraw history */}
        <div>
          <h3 className="font-bold text-gray-800 text-sm mb-3">Lịch sử rút tiền</h3>
          <div className="flex flex-col gap-2">
            {withdrawHistory.map(w => (
              <div key={w.id} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm flex items-center justify-between">
                <div>
                  <div className="font-bold text-gray-900 text-sm">{w.amount}</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">{w.bank} · {w.date}</div>
                </div>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-0.5 rounded-full">✓ Hoàn thành</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Withdraw modal (simple) */}
      {showWithdraw && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-end" onClick={() => setShowWithdraw(false)}>
          <div className="bg-white w-full rounded-t-3xl p-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-black text-lg text-gray-900 mb-1">Yêu cầu rút tiền</h3>
            <p className="text-sm text-gray-500 mb-4">Số dư đủ điều kiện: <span className="font-bold text-emerald-600">6.840.000đ</span></p>
            <input
              type="number"
              placeholder="Nhập số tiền cần rút"
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm font-medium outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 mb-4"
            />
            <button
              onClick={() => setShowWithdraw(false)}
              className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-indigo-500/30"
            >
              Xác nhận rút tiền
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
