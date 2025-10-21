export function checkUserRole(role) {
  const allowedRoles = ['Executive Chef', 'Admin', 'Pastry Chef'];
  return allowedRoles.includes(role);
}

export function getDefaultUser() {
  return {
    username: 'Chef',
    role: 'Executive Chef',
  };
}
