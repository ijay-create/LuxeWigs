import { Navigate } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";

const ProtectedAdmin = ({ children }) => {
  const user = getUserFromToken();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedAdmin;