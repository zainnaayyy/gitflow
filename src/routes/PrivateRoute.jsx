import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PrivateLayout } from "../app/pages";
import { useAuth } from "../shared";

const PrivateRoute = () => {
  const { isValidToken } = useAuth();
  const location = useLocation()

  return isValidToken ? (
          <PrivateLayout>{<Outlet />}</PrivateLayout>
        ) : (
          <Navigate to="/" replace state={{ from: location }} />
        )
};

export default PrivateRoute;
