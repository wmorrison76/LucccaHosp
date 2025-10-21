import React from 'react';

export function PrivateRoute({ children }) {
  // In a real app, this would check authentication
  return children;
}

export default PrivateRoute;
