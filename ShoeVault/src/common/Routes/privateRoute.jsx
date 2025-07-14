
import React from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); // Check if logged in
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
