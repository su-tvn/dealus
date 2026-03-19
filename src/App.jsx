import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import { ROLES } from './constants/roles';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import FeedScreen from './screens/FeedScreen';
import ChatScreen from './screens/ChatScreen';
import ShoppingScreen from './screens/ShoppingScreen';
import ProfileScreen from './screens/ProfileScreen';

import AgentDashboard from './screens/agent/AgentDashboard';
import AgentTreeView from './screens/agent/AgentTreeView';
import AgentSupplierHub from './screens/agent/AgentSupplierHub';
import AgentCatalog from './screens/agent/AgentCatalog';
import AgentCommission from './screens/agent/AgentCommission';
import AgentCustomers from './screens/agent/AgentCustomers';

import SupplierDashboard from './screens/supplier/SupplierDashboard';
import SupplierProducts from './screens/supplier/SupplierProducts';

import AppHeader from './components/common/AppHeader';
import BottomNav from './components/common/BottomNav';

const HEADER_TABS = ['home', 'shopping', 'profile'];

function UserApp() {
  const { activeTab } = useApp();
  const showHeader = HEADER_TABS.includes(activeTab);
  return (
    <>
      {showHeader && <AppHeader />}
      <div className="flex-1 overflow-y-auto hide-scrollbar pb-24 bg-gray-50">
        {activeTab === 'home'     && <HomeScreen />}
        {activeTab === 'feed'     && <FeedScreen />}
        {activeTab === 'chat'     && <ChatScreen />}
        {activeTab === 'shopping' && <ShoppingScreen />}
        {activeTab === 'profile'  && <ProfileScreen />}
      </div>
      <BottomNav />
    </>
  );
}

function AgentApp() {
  const { activeTab } = useApp();
  return (
    <>
      <div className="flex-1 overflow-y-auto hide-scrollbar pb-24 bg-gray-50">
        {activeTab === 'home'             && <AgentDashboard />}
        {activeTab === 'agentTree'        && <AgentTreeView />}
        {activeTab === 'agentSuppliers'   && <AgentSupplierHub />}
        {activeTab === 'agentCatalog'     && <AgentCatalog />}
        {activeTab === 'agentCommission'  && <AgentCommission />}
        {activeTab === 'agentCustomers'   && <AgentCustomers />}
        {activeTab === 'chat'             && <ChatScreen />}
        {activeTab === 'feed'             && <FeedScreen />}
        {activeTab === 'profile'          && <ProfileScreen />}
      </div>
      <BottomNav />
    </>
  );
}

function SupplierApp() {
  const { activeTab } = useApp();
  return (
    <>
      <div className="flex-1 overflow-y-auto hide-scrollbar pb-24 bg-gray-50">
        {activeTab === 'home'             && <SupplierDashboard />}
        {activeTab === 'supplierProducts' && <SupplierProducts />}
        {activeTab === 'chat'             && <ChatScreen />}
        {activeTab === 'feed'             && <FeedScreen />}
        {activeTab === 'profile'          && <ProfileScreen />}
      </div>
      <BottomNav />
    </>
  );
}

function AppShell() {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated) return <LoginScreen />;
  if (role === ROLES.AGENT)    return <AgentApp />;
  if (role === ROLES.SUPPLIER) return <SupplierApp />;
  return <UserApp />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <div className="min-h-screen bg-white flex justify-center font-sans text-gray-800">
          <div className="w-full max-w-md bg-white relative overflow-hidden flex flex-col h-[100dvh]">
            <AppShell />
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            .pb-safe { padding-bottom: max(env(safe-area-inset-bottom), 12px); }
          `}} />
        </div>
      </AppProvider>
    </AuthProvider>
  );
}
