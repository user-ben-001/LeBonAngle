import { useAuth } from "../contexts/UserContext.jsx";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { userInfo, refreshToken } = useAuth();

  if (!userInfo) {
    refreshToken();

    if (!refreshToken) {
      return <Navigate to="/login" replace />;
    }
  }
  return children;
};
