import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContextProvider";

function PrivateRoute() {
  const { currentUser } = useAuth();
  return currentUser && currentUser.get("emailVerified") ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;