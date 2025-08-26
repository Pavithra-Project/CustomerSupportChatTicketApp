import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ role, children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== role) {
    // redirect based on role or default to login
    if (role === "Admin") return <Navigate to="/AdminLogin" />;
    if (role === "Agent") return <Navigate to="/AgentLogin" />;
    return <Navigate to="/Login" />;
  }

  return children;
};

export default PrivateRoute;
