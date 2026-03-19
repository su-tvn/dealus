import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Users, Star, TrendingUp, ArrowLeft } from 'lucide-react';
import { agentTree } from '../../data/mockAgents';
import { useApp } from '../../context/AppContext';

const RANK_BADGE = {
  Diamond: 'bg-cyan-100 text-cyan-700 border-cyan-200',
  Gold: 'bg-amber-100 text-amber-700 border-amber-200',
  Silver: 'bg-gray-100 text-gray-600 border-gray-200',
};

function AgentNode({ node, depth = 0 }) {
  const [expanded, setExpanded] = useState(depth < 1);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className={`${depth > 0 ? 'ml-4 border-l-2 border-dashed border-gray-200 pl-3' : ''}`}>
      <div
        className={`bg-white border border-gray-100 rounded-2xl p-3 mb-2 shadow-sm flex items-center gap-3 ${hasChildren ? 'cursor-pointer hover:bg-gray-50' : ''} transition-colors`}
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        <img src={node.img} alt={node.name} className="w-10 h-10 rounded-full object-cover border border-gray-200 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-gray-900 text-sm">{node.name}</span>
            <span className={`text-[9px] font-bold border px-1.5 py-0.5 rounded-full ${RANK_BADGE[node.rank] || RANK_BADGE.Silver}`}>
              {node.rank}
            </span>
          </div>
          <p className="text-[11px] text-gray-500 truncate">{node.role}</p>
          <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-500">
            <span className="flex items-center gap-0.5"><Star size={10} className="text-amber-400 fill-amber-400" /> {node.rating}</span>
            <span className="flex items-center gap-0.5"><TrendingUp size={10} className="text-emerald-500" /> {node.totalDeal} deals</span>
            <span className="text-emerald-600 font-semibold">{node.revenue}</span>
          </div>
        </div>

        {hasChildren && (
          <div className="shrink-0 flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
              <Users size={12} /> {node.children.length}
            </div>
            {expanded ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
          </div>
        )}
      </div>

      {hasChildren && expanded && (
        <div>
          {node.children.map(child => (
            <AgentNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AgentTreeView() {
  const { setActiveTab } = useApp();

  const countNodes = (node) => 1 + (node.children || []).reduce((sum, c) => sum + countNodes(c), 0);
  const totalAgents = countNodes(agentTree) - 1; // exclude root (self)

  return (
    <div className="flex flex-col min-h-full">

      {/* Header */}
      <div className="bg-white px-4 pt-6 pb-4 shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => setActiveTab('home')} className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
            <ArrowLeft size={18} className="text-gray-700" />
          </button>
          <div>
            <h2 className="font-black text-xl text-gray-900">Cây Đội Nhóm</h2>
            <p className="text-[11px] text-gray-500 font-medium">{totalAgents} agents trong mạng lưới của bạn</p>
          </div>
        </div>

        {/* Summary pills */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {[
            { label: 'Tổng agents', value: totalAgents, color: 'bg-blue-50 text-blue-700' },
            { label: 'Diamond', value: 1, color: 'bg-cyan-50 text-cyan-700' },
            { label: 'Gold', value: 2, color: 'bg-amber-50 text-amber-700' },
            { label: 'Silver', value: 3, color: 'bg-gray-100 text-gray-600' },
          ].map((pill, i) => (
            <div key={i} className={`flex-none px-3 py-1.5 rounded-full text-xs font-bold ${pill.color}`}>
              {pill.label}: {pill.value}
            </div>
          ))}
        </div>
      </div>

      {/* Tree (root = self, children = downline) */}
      <div className="flex-1 overflow-y-auto px-4 py-5">
        <AgentNode node={agentTree} depth={0} />
      </div>
    </div>
  );
}
