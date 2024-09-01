import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: ReactElement;
  isAuthenticated: boolean;
}

const ProtectedRoute = ({ element, isAuthenticated }: ProtectedRouteProps) => {
  // return isAuthenticated ? element : <Navigate to="/login" />;
  return element;
};

export default ProtectedRoute;
