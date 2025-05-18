import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const AuthRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const accessToken = localStorage.getItem("accessToken");
  const location = useLocation();

  if (!isAuthenticated && !accessToken) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};
