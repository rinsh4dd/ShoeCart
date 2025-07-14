import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const AdminPrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  const isAdmin = user?.role === "admin";

  return isAdmin ? children : <Navigate to="/admin/login" replace />;
};

export default AdminPrivateRoute;
