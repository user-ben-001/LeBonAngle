import { useAuth } from "../contexts/UserContext.jsx";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { userInfo } = useAuth();

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
