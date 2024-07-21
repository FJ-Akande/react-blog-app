import { useContext } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { UserContext } from "../../contexts/user.context";
import { signOutUSer } from "../../utils/firebase/firebase.utils";
import userDp from "../../assets/userdp.png";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const signOut = () => {
    signOutUSer();
    setCurrentUser(null);
  };

  return (
    <>
      <div className="fixed w-full top-0 bg-primary border-b border-gray-700 text-white">
        <div className="flex items-center justify-between max-w-[80%] mx-auto py-3">
          <NavLink to="/">
            <h1 className="font-bold">Cannabud.</h1>
          </NavLink>
          <div className="w-2/5">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="search blogs..."
              className="w-full border border-gray-700 rounded-3xl bg-transparent outline-none py-2 px-4"
            />
          </div>
          {currentUser ? (
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={signOut}
            >
              <img
                src={userDp}
                alt="display-picture"
                className="h-10 w-10 bg-black rounded-full"
              />
              <IoIosArrowDown className="text-xl text-gray-500" />
            </div>
          ) : (
            <button
              type="button"
              className="border border-gray-700 text-white font-semibold px-6 py-2 rounded-lg"
              onClick={() => navigate("/sign-in")}
            >
              Login
            </button>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
