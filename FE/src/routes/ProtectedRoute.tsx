import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { PATH_CONSTANTS } from "../api/PathConstant";

interface ProtectedRouteProps {
  children: ReactNode;
  isAuthenticated: boolean;
  guestOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isAuthenticated,
  guestOnly,
}) => {
  if (guestOnly && isAuthenticated) {
    return <Navigate to={PATH_CONSTANTS.ROOT.ROOT} replace />;
  }

  if (!guestOnly && !isAuthenticated) {
    return <Navigate to={PATH_CONSTANTS.AUTH.LOGIN} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
