import React from 'react';
import { Home, Globe, MessageSquare, ShoppingBag, User, Users, Package, ClipboardList, Building2, Coins } from 'lucide-react';
import NavItem from './NavItem';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../constants/roles';

function ChatButton({ activeTab, setActiveTab }) {
  return (
    <div className="relative -top-5">
      <button
        onClick={() => setActiveTab('chat')}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform border-4 border-white ${
          activeTab === 'chat'
            ? 'bg-gray-900 text-white shadow-gray-500/30 scale-105'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/30 hover:scale-105'
        }`}
      >
        <MessageSquare size={24} />
        {activeTab !== 'chat' && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-rose-500 border-2 border-white rounded-full" />
        )}
      </button>
      <span className={`absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-bold ${activeTab === 'chat' ? 'text-gray-900' : 'text-gray-500'}`}>
        Chat
      </span>
    </div>
  );
}

export default function BottomNav() {
  const { activeTab, setActiveTab } = useApp();
  const { role } = useAuth();

  return (
    <nav className="absolute bottom-0 w-full bg-white border-t border-gray-200 px-6 py-2 flex justify-between items-center z-20 pb-safe">
      {role === ROLES.AGENT && (
        <>
          <NavItem icon={<Home size={22} />} label="Trang chủ" isActive={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <NavItem icon={<Building2 size={22} />} label="Đối tác" isActive={activeTab === 'agentSuppliers'} onClick={() => setActiveTab('agentSuppliers')} />
          <div className="relative -top-5">
            <button
              onClick={() => setActiveTab('agentCustomers')}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform border-4 border-white ${
                activeTab === 'agentCustomers'
                  ? 'bg-gray-900 text-white shadow-gray-500/30 scale-105'
                  : 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-teal-500/30 hover:scale-105'
              }`}
            >
              <Users size={24} />
              {activeTab !== 'agentCustomers' && (
                <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-rose-500 border-2 border-white rounded-full" />
              )}
            </button>
            <span className={`absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-bold whitespace-nowrap ${activeTab === 'agentCustomers' ? 'text-gray-900' : 'text-gray-500'}`}>
              Khách hàng
            </span>
          </div>
          <NavItem icon={<Coins size={22} />} label="Hoa hồng" isActive={activeTab === 'agentCommission'} onClick={() => setActiveTab('agentCommission')} />
          <NavItem icon={<User size={22} />} label="Cá nhân" isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
        </>
      )}

      {role === ROLES.SUPPLIER && (
        <>
          <NavItem icon={<Home size={22} />} label="Trang chủ" isActive={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <NavItem icon={<Package size={22} />} label="Kho hàng" isActive={activeTab === 'supplierProducts'} onClick={() => setActiveTab('supplierProducts')} />
          <ChatButton activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem icon={<ClipboardList size={22} />} label="Đơn hàng" isActive={activeTab === 'supplierOrders'} onClick={() => setActiveTab('supplierOrders')} />
          <NavItem icon={<User size={22} />} label="Cá nhân" isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
        </>
      )}

      {role === ROLES.USER && (
        <>
          <NavItem icon={<Home size={22} />} label="Home" isActive={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <NavItem icon={<Globe size={22} />} label="Feed" isActive={activeTab === 'feed'} onClick={() => setActiveTab('feed')} />
          <ChatButton activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem icon={<ShoppingBag size={22} />} label="Mua sắm" isActive={activeTab === 'shopping'} onClick={() => setActiveTab('shopping')} />
          <NavItem icon={<User size={22} />} label="Cá nhân" isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
        </>
      )}
    </nav>
  );
}
