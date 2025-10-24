import { useState, useEffect, useContext, createContext } from 'react';

const UserRoleContext = createContext(null);

// Default mock user - can be replaced with actual auth system
const DEFAULT_USER = {
  id: 'user-1',
  name: 'Chef Marco',
  role: 'chef', // 'chef' | 'manager' | 'director' | 'owner'
  outletIds: ['outlet-1'], // outlets this user can see
  permissions: ['view_dashboard', 'view_labor', 'view_financials'],
};

export function useUserRole() {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('luccca:user:role:v1');
      return stored ? JSON.parse(stored) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  useEffect(() => {
    localStorage.setItem('luccca:user:role:v1', JSON.stringify(user));
  }, [user]);

  const switchRole = (role, outletIds = ['outlet-1']) => {
    setUser(prev => ({
      ...prev,
      role,
      outletIds,
      name: getRoleDisplayName(role),
    }));
  };

  const canViewOutlet = (outletId) => {
    return user.outletIds.includes(outletId);
  };

  const canViewAllOutlets = () => {
    return user.role === 'owner' || user.role === 'director';
  };

  const hasPermission = (permission) => {
    return user.permissions.includes(permission);
  };

  return {
    user,
    switchRole,
    canViewOutlet,
    canViewAllOutlets,
    hasPermission,
  };
}

function getRoleDisplayName(role) {
  const names = {
    'chef': 'Chef - Single Outlet',
    'manager': 'Manager - Regional',
    'director': 'Director - Multi-Outlet',
    'owner': 'Owner - All Outlets',
  };
  return names[role] || 'User';
}

export const ROLES = {
  CHEF: 'chef',           // Single outlet only
  MANAGER: 'manager',     // Multiple assigned outlets
  DIRECTOR: 'director',   // Region with multiple outlets
  OWNER: 'owner',         // All outlets
};

export const ROLE_CONFIGS = {
  'chef': {
    name: 'Chef',
    maxOutlets: 1,
    canCompare: false,
    canModifyOtherOutlets: false,
  },
  'manager': {
    name: 'Manager',
    maxOutlets: 5,
    canCompare: true,
    canModifyOtherOutlets: false,
  },
  'director': {
    name: 'Director',
    maxOutlets: 20,
    canCompare: true,
    canModifyOtherOutlets: true,
  },
  'owner': {
    name: 'Owner',
    maxOutlets: 100,
    canCompare: true,
    canModifyOtherOutlets: true,
  },
};
