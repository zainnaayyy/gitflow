import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { PublicLayout } from "../app/pages";
import { useAuth } from "../shared";

const PublicRoute = () => {
  const { isValidToken, user } = useAuth();

  return isValidToken ? (
    <Navigate to="/dashboard" />
  ) : (
    <PublicLayout user={user}>{<Outlet />}</PublicLayout>
  );
};

export default PublicRoute;
