import React from 'react';
import { Bell, Search, Crown, Coins, ChevronRight } from 'lucide-react';
import { DealusLogoIcon } from './DealusLogo';
import { useAuth } from '../../context/AuthContext';

export default function AppHeader() {
  const { currentUser } = useAuth();

  return (
    <header className="bg-white px-4 pt-6 pb-3 sticky top-0 z-10 shadow-sm flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20">
            <DealusLogoIcon className="w-5 h-5" color="text-white" />
          </div>
          <span className="text-xl font-black tracking-tight text-gray-900">
            Deal<span className="text-blue-600">Us</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <Search size={18} className="text-gray-600" />
          </button>
          <button className="p-2 bg-gray-100 rounded-full relative hover:bg-gray-200 transition-colors">
            <Bell size={18} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white" />
          </button>
        </div>
      </div>

      {/* User greeting & wallet */}
      <div className="flex justify-between items-center bg-gray-50 rounded-xl p-2.5 border border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <img src={currentUser.avatar} alt="Avatar" className="w-9 h-9 rounded-full border border-amber-400 object-cover" />
            <div className="absolute -bottom-1 -right-1 bg-amber-400 p-0.5 rounded-full border border-white">
              <Crown size={10} className="text-white" />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="font-semibold text-gray-900 text-[13px] leading-tight">Chào, {currentUser.name}</h1>
            <div className="flex items-center text-[11px] text-amber-600 font-medium mt-0.5">
              {currentUser.rank} <ChevronRight size={12} className="ml-0.5" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg px-3 py-1.5 flex items-center gap-1.5 border border-amber-100 shadow-sm cursor-pointer hover:bg-amber-50">
          <Coins size={14} className="text-amber-500" />
          <span className="text-sm font-bold text-amber-600">{currentUser.coins}</span>
        </div>
      </div>
    </header>
  );
}
