import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContextProvider";

function PrivateRoute() {
  const { currentUser } = useAuth();
  const isEmailVerified = currentUser?.get("emailVerified") || false;
  isEmailVerified === false &&
    alert("Please verify your email address to login");
  return currentUser && isEmailVerified ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
