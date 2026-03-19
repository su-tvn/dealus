import React from 'react';
import { Filter, Hash, Users, ShieldCheck, Flame, MessageCircle, Edit3 } from 'lucide-react';
import { feedCategories, feedRooms } from '../data/mockFeed';

export default function FeedScreen() {
  return (
    <div className="bg-gray-50 pb-8 min-h-full relative">

      {/* Header */}
      <div className="bg-white px-4 pt-6 pb-2 shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-black text-xl text-gray-900 tracking-tight">Khám phá <span className="text-blue-600">Cộng đồng</span></h2>
            <p className="text-[11px] text-gray-500 font-medium mt-0.5">Nơi người mua & chuyên gia cùng thảo luận</p>
          </div>
          <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors">
            <Filter size={18} />
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
          {feedCategories.map((cat, idx) => (
            <button key={idx} className={`flex-none px-4 py-1.5 rounded-full text-xs font-bold border transition-colors ${idx === 0 ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/30' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Room List */}
      <div className="px-4 py-4 flex flex-col gap-4">
        {feedRooms.map(room => (
          <div key={room.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col relative overflow-hidden group">
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-1.5">
                {room.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded flex items-center gap-0.5">
                    <Hash size={10} className="text-gray-400"/> {tag}
                  </span>
                ))}
              </div>
              {room.isHot && (
                <div className="bg-rose-50 text-rose-600 px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 border border-rose-100">
                  <Flame size={12} className="fill-rose-100" /> Hot
                </div>
              )}
            </div>

            <h3 className="font-bold text-gray-900 text-base leading-snug mb-3 pr-8">{room.title}</h3>

            {room.unreadCount > 0 && (
              <div className="absolute top-12 right-4 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                +{room.unreadCount}
              </div>
            )}

            {/* Active Agent badge */}
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-2.5 flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <img src={room.activeAgent.avatar} className="w-8 h-8 rounded-full border border-emerald-200" alt="Agent"/>
                <div>
                  <p className="text-[11px] text-gray-500 leading-none mb-1">Được quản trị & tư vấn bởi</p>
                  <p className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                    {room.activeAgent.name} <ShieldCheck size={12} className="text-emerald-500" />
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">{room.activeAgent.role}</span>
            </div>

            {/* Latest post snippet */}
            <div className="bg-gray-50 rounded-xl p-3 flex gap-3 items-start border border-gray-100">
              <img src={room.latestPost.userAvatar} className="w-6 h-6 rounded-full mt-0.5 shrink-0" alt="User"/>
              <div>
                <p className="text-[11px] font-bold text-gray-700 mb-0.5">{room.latestPost.userName}</p>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">"{room.latestPost.content}"</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                <Users size={14} className="text-gray-400" /> {room.memberCount} thành viên
              </div>
              <button className="bg-gray-900 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:bg-gray-800 transition-colors flex items-center gap-1.5">
                <MessageCircle size={14} /> Tham gia ngay
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FAB */}
      <button className="fixed bottom-24 right-4 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/40 hover:scale-105 transition-transform z-20 border-2 border-white">
        <Edit3 size={24} />
      </button>
    </div>
  );
}
