import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ROLES, ROLE_LABELS } from '../constants/roles';

export default function ProfileScreen() {
  const { currentUser, role, handleLogout } = useAuth();

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden mt-4">
        <img src={currentUser.avatar} alt="Avatar" className="w-full h-full object-cover" />
      </div>
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900">{currentUser.name}</h2>
        <span className="inline-block mt-1 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          {ROLE_LABELS[role]}
        </span>
      </div>

      <div className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col gap-3 mt-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 font-medium">Hạng thành viên</span>
          <span className="font-bold text-amber-600">{currentUser.rank}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 font-medium">Số Xu</span>
          <span className="font-bold text-amber-600">{currentUser.coins}</span>
        </div>
      </div>

      <div className="w-full mt-4">
        <button onClick={handleLogout} className="w-full py-3 bg-red-50 text-red-600 font-bold rounded-xl border border-red-100 hover:bg-red-100 transition-colors">
          Đăng xuất an toàn
        </button>
      </div>
    </div>
  );
}
