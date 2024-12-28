import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("userSession");
  return isLoggedIn ? children : <Navigate to="/" />;
};

export default PrivateRoute;
