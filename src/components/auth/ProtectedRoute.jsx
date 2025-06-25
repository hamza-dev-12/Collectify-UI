import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const authenticate = () => {
    if (!token) {
      setIsAuthenticated(false);
      throw new Error("Please login");
    }

    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) throw new Error("Please login again!");

    setIsAuthenticated(true);
  };

  useEffect(() => {
    try {
      authenticate();
    } catch (error) {
      navigate("/login");
    }
  }, []);

  return isAuthenticated && children;
};

export default ProtectedRoute;
