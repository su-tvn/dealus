import React, { createContext, useContext, useState } from 'react';
import { ROLES } from '../constants/roles';
import { userProfile } from '../data/mockUser';
import { agentProfile } from '../data/mockAgents';
import { supplierProfile } from '../data/mockSupplier';

const AuthContext = createContext(null);

const profileByRole = {
  [ROLES.USER]: userProfile,
  [ROLES.AGENT]: agentProfile,
  [ROLES.SUPPLIER]: supplierProfile,
};

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(ROLES.USER);

  const currentUser = profileByRole[role];

  const handleLogin = (selectedRole) => {
    setRole(selectedRole || ROLES.USER);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole(ROLES.USER);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, currentUser, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
