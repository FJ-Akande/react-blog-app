import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useContext(UserContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="bg-secondary pt-24 text-white min-h-screen">
        <div className="max-w-[80%] mx-auto font-medium">Loading...</div>
      </div>
    );
  }

  return currentUser ? (
    children
  ) : (
    <Navigate to="/sign-in" replace state={{ from: location }} />
  );
};

export default PrivateRoute;
