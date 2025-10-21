// File: utils/invoice/roles.js
export const RolePermissions = {
  EMP: ['view'],
  RCV: ['view', 'receive'],
  BUY: ['view', 'order'],
  ADM: ['view', 'order', 'receive', 'override', 'audit']
};

export function canPerform(role, action) {
  return RolePermissions[role]?.includes(action);
}
