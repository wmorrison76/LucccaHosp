import React from "react";
import { Navigate } from "react-router-dom";

export default function GuardedRoute({ roles=[], user, children }){
  if(!user) return <Navigate to="/login" replace />;
  if(roles.length && !roles.includes(user.role)) return <Navigate to="/403" replace />;
  return children;
}
