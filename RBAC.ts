export const RBAC = {
  roles: {
    admin: ['*'],
    manager: ['view_reports', 'edit_orders'],
    staff: ['view_orders'],
  },
  can: (role, permission) => {
    return RBAC.roles[role]?.includes('*') || RBAC.roles[role]?.includes(permission);
  },
};