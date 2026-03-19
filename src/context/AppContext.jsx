import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [activeTab, setActiveTab] = useState('home');
  const [chatFilter, setChatFilter] = useState('all');

  return (
    <AppContext.Provider value={{ activeTab, setActiveTab, chatFilter, setChatFilter }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
