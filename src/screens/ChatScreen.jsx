import React from 'react';
import { Search, PhoneCall, ShieldCheck, Lock, CheckCheck } from 'lucide-react';
import { chatHistory } from '../data/mockChat';
import { useApp } from '../context/AppContext';

export default function ChatScreen() {
  const { chatFilter, setChatFilter } = useApp();

  const filters = [
    { key: 'all', label: 'Tất cả' },
    { key: 'unread', label: 'Chưa đọc (3)' },
    { key: 'agents', label: 'Chuyên gia' },
  ];

  return (
    <div className="bg-gray-50 pb-8 min-h-full">

      {/* Header */}
      <div className="bg-white px-4 pt-6 pb-4 shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="font-black text-xl text-gray-900 tracking-tight">Tin nhắn & Tư vấn</h2>
            <p className="text-[11px] text-gray-500 font-medium mt-0.5">Hỗ trợ chốt deal trực tiếp từ Chuyên gia</p>
          </div>
          <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
            <PhoneCall size={18} className="text-gray-600" />
          </button>
        </div>
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm tin nhắn, tên môi giới..."
            className="w-full bg-gray-50 text-sm rounded-xl py-2.5 pl-10 pr-4 outline-none border border-gray-100 focus:border-blue-500 focus:bg-white transition-all font-medium"
          />
        </div>
      </div>

      {/* Security notice */}
      <div className="px-4 mt-4">
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 flex items-start gap-3">
          <div className="bg-indigo-100 p-1.5 rounded-lg shrink-0">
            <Lock size={16} className="text-indigo-600" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-indigo-900 mb-0.5">Bảo mật ẩn số tuyệt đối</h3>
            <p className="text-[10px] text-indigo-700 leading-snug">Toàn bộ cuộc gọi và tin nhắn trên DealUs đều được mã hóa, không lộ số điện thoại cá nhân.</p>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 px-4 mt-4 overflow-x-auto hide-scrollbar">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setChatFilter(key)}
            className={`flex-none px-4 py-1.5 rounded-full text-xs font-bold border transition-colors ${chatFilter === key ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Chat list */}
      <div className="mt-4 flex flex-col">
        {chatHistory.map((chat) => (
          <div key={chat.id} className="px-4 py-3 flex gap-3 hover:bg-white transition-colors cursor-pointer group border-b border-gray-100/50 last:border-0">
            <div className="relative shrink-0">
              <img src={chat.avatar} alt={chat.name} className={`w-14 h-14 rounded-full object-cover ${chat.isAgent ? 'border-2 border-emerald-400' : 'border border-gray-200'}`} />
              {chat.isOnline && (
                <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
              )}
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-1.5 truncate pr-2">
                  <h3 className={`text-sm truncate ${chat.unread > 0 ? 'font-black text-gray-900' : 'font-bold text-gray-800'}`}>
                    {chat.name}
                  </h3>
                  {chat.isAgent && <ShieldCheck size={14} className="text-emerald-500 shrink-0" />}
                </div>
                <span className={`text-[10px] shrink-0 mt-0.5 ${chat.unread > 0 ? 'font-bold text-blue-600' : 'font-medium text-gray-400'}`}>
                  {chat.time}
                </span>
              </div>

              <p className={`text-xs line-clamp-1 mb-1.5 ${chat.unread > 0 ? 'font-bold text-gray-800' : 'text-gray-500'}`}>
                {chat.lastMsg}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <div className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[9px] font-bold truncate max-w-[75%]">
                  {chat.context}
                </div>
                {chat.unread > 0 ? (
                  <div className="bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shrink-0">
                    {chat.unread}
                  </div>
                ) : (
                  <CheckCheck size={14} className="text-blue-500 shrink-0" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
