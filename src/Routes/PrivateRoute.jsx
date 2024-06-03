import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
const location = useLocation();
  if (loading) {
    return (
      <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
        <div 
          className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" 
          style={{ width: "45%" }}
        >
          Loading...
        </div>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{from:location}} replace />;
};

export default PrivateRoute;
