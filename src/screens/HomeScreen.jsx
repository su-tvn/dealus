import React from 'react';
import {
  Crown, Coins, Users, UserCheck, Star, ShieldCheck, ChevronRight,
  Sparkles, Flame, Hash, ArrowRight, ArrowUpRight,
  Gift, Tv, Building, Layout, UserPlus
} from 'lucide-react';
import { superAppActions } from '../data/mockUser';

const ICON_MAP = { Users, UserCheck, Gift, Crown, Tv, Building, Layout, UserPlus };

function SuperAppIcon({ iconName, iconColor, size = 22 }) {
  const Icon = ICON_MAP[iconName];
  return Icon ? <Icon size={size} className={iconColor} /> : null;
}
import { topAgents } from '../data/mockAgents';
import { feedRooms } from '../data/mockFeed';
import { shopRecommended } from '../data/mockShop';
import { useApp } from '../context/AppContext';

export default function HomeScreen() {
  const { setActiveTab } = useApp();

  return (
    <div className="flex flex-col gap-5 pb-6">

      {/* 1. VIP Membership Banner */}
      <div className="px-4 pt-4">
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl p-5 text-white shadow-xl shadow-gray-900/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-orange-500/0 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-10 w-24 h-24 bg-blue-500/20 rounded-full blur-xl" />
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full flex items-center gap-1.5 w-fit">
                <Crown size={14} className="text-amber-400" />
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">DealUs VIP Club</span>
              </div>
              <span className="text-[10px] font-medium text-gray-400">Chỉ từ 99k/tháng</span>
            </div>
            <h3 className="font-black text-xl leading-tight mb-2">Nâng cấp đặc quyền,<br />mua sắm với giá sỉ.</h3>
            <p className="text-xs text-gray-300 mb-5 max-w-[85%]">Giảm ngay 10% khi mua qua hệ thống, ưu tiên xem sớm các deal nội bộ.</p>
            <button className="bg-gradient-to-r from-amber-400 to-orange-500 text-gray-900 text-sm font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-orange-500/30 hover:scale-105 transition-transform flex items-center gap-2">
              Nâng cấp ngay <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Super-App Grid */}
      <div className="px-4">
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 grid grid-cols-4 gap-y-5 gap-x-2">
          {superAppActions.map(action => (
            <button key={action.id} className="flex flex-col items-center gap-2 group">
              <div className={`w-12 h-12 ${action.bg} rounded-[1rem] flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <SuperAppIcon iconName={action.iconName} iconColor={action.iconColor} />
              </div>
              <span className="text-[10px] font-bold text-gray-600 text-center leading-tight px-1">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Products you may like */}
      <div className="px-4">
        <div className="flex justify-between items-end mb-3">
          <h2 className="font-bold text-gray-900 text-lg flex items-center gap-2">
            <Sparkles size={18} className="text-blue-500" /> Có thể bạn sẽ thích
          </h2>
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('shopping'); }} className="text-[11px] text-blue-600 font-bold flex items-center gap-0.5">
            Xem siêu thị <ChevronRight size={12}/>
          </a>
        </div>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar snap-x pb-2 -mx-4 px-4">
          {shopRecommended.map(item => (
            <div key={item.id} className="flex-none w-[160px] bg-white border border-gray-100 rounded-2xl p-2 shadow-sm snap-center flex flex-col">
              <img src={item.img} alt={item.name} className="w-full h-28 object-cover rounded-xl mb-2" />
              <h4 className="text-[11px] font-bold text-gray-800 line-clamp-2 leading-tight mb-2">{item.name}</h4>
              <div className="mt-auto">
                <div className="text-rose-600 font-bold text-[13px]">{item.price}</div>
                <div className="text-gray-400 text-[10px] line-through mb-1.5">{item.oldPrice}</div>
                <div className="pt-2 border-t border-gray-50">
                  <span className="text-[9px] text-gray-500 flex items-center gap-1 line-clamp-1">
                    <ShieldCheck size={10} className="text-emerald-500 shrink-0"/> {item.agent}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Top Agents */}
      <div className="px-4">
        <div className="bg-gradient-to-b from-emerald-50 to-white rounded-3xl p-4 border border-emerald-100">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h2 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                <UserCheck size={18} className="text-emerald-600" /> Chuyên gia nổi bật
              </h2>
              <p className="text-[11px] text-gray-500 mt-0.5">Sẵn sàng tư vấn trực tiếp 1:1</p>
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 -mx-2 px-2">
            {topAgents.map(agent => (
              <div key={agent.id} className="flex-none w-[140px] bg-white border border-gray-100 rounded-2xl p-3 shadow-sm text-center flex flex-col items-center hover:border-emerald-200 transition-colors">
                <div className="relative mb-2">
                  <img src={agent.img} alt={agent.name} className="w-14 h-14 rounded-full object-cover border-2 border-emerald-400" />
                  <div className="absolute -bottom-1 inset-x-0 mx-auto w-fit bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                    {agent.rank}
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-xs">{agent.name}</h3>
                <p className="text-[10px] text-gray-500 mb-2 line-clamp-1">{agent.role}</p>
                <div className="flex items-center justify-center gap-1 bg-amber-50 px-2 py-0.5 rounded text-[10px] text-amber-700 font-bold mb-3 w-full">
                  <Star size={10} className="fill-amber-400 text-amber-400" />
                  {agent.rating}
                </div>
                <button onClick={() => setActiveTab('chat')} className="w-full bg-emerald-50 text-emerald-700 text-[10px] font-bold py-1.5 rounded-lg hover:bg-emerald-100 transition-colors">
                  Nhắn tin
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Hot Community */}
      <div className="px-4">
        <div className="flex justify-between items-end mb-3">
          <h2 className="font-bold text-gray-900 text-lg flex items-center gap-2">
            <Flame size={18} className="text-rose-500 fill-rose-100" /> Đang thảo luận
          </h2>
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('feed'); }} className="text-[11px] text-blue-600 font-bold flex items-center gap-0.5">
            Vào Feed <ChevronRight size={12}/>
          </a>
        </div>
        <div className="flex flex-col gap-3">
          {feedRooms.slice(0, 2).map(room => (
            <div key={room.id} onClick={() => setActiveTab('feed')} className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm flex items-start gap-3 cursor-pointer hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <Hash size={20} className="text-blue-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-sm leading-tight mb-1">{room.title}</h3>
                <div className="flex items-center gap-2 text-[10px] text-gray-500">
                  <span className="flex items-center gap-0.5"><Users size={12}/> {room.memberCount}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span className="text-rose-500 font-bold">+{room.unreadCount} bài mới</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-300 self-center" />
            </div>
          ))}
        </div>
      </div>

      {/* 6. Referral banner */}
      <div className="px-4 mt-2">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-1 relative overflow-hidden shadow-lg shadow-blue-500/20">
          <div className="bg-white/10 absolute inset-0 backdrop-blur-sm" />
          <div className="bg-white rounded-[1.35rem] p-4 relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center shrink-0 relative">
              <Coins size={24} className="text-amber-500" />
              <div className="absolute -top-1 -right-1 bg-rose-500 w-4 h-4 rounded-full animate-ping opacity-75" />
              <div className="absolute -top-1 -right-1 bg-rose-500 w-4 h-4 rounded-full border-2 border-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-sm">Mời bạn bè, nhận Quà Khủng!</h3>
              <p className="text-[11px] text-gray-500 leading-snug mt-0.5">Tặng ngay 500 Xu cho bạn & đối tác khi họ hoàn tất đăng ký.</p>
            </div>
            <button className="bg-gray-900 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 hover:scale-110 transition-transform shadow-md">
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
