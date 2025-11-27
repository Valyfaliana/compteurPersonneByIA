import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/hooks/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  // Rediriger vers login quand il n'y a pas de token
  return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;
