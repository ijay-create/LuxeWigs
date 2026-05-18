import { Navigate } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";

const ProtectedUser = ({ children }) => {
  const user = getUserFromToken();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedUser;