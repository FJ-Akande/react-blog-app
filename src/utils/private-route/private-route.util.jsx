import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import Spinner from "../../components/spinner/spinner.component";

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useContext(UserContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="bg-secondary text-white min-h-screen flex justify-center items-center">
        <Spinner />
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
