import { useContext } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { IoIosArrowDown } from "react-icons/io";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { BsGlobeEuropeAfrica } from "react-icons/bs";
import { FaCircleQuestion } from "react-icons/fa6";
import Footer from "../../components/footer/footer.component";
import userDp from "../../assets/userdp.png";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const navLinks = [
    {
      id: 1,
      name: "Projects",
      link: "/",
      icon: <HiMiniSquares2X2 />,
    },
    {
      id: 2,
      name: "News",
      link: "/abc",
      icon: <BsGlobeEuropeAfrica />,
    },
    {
      id: 3,
      name: "How It Works",
      link: "/cde",
      icon: <FaCircleQuestion />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed w-full top-0 bg-primary border-b border-gray-700 text-white">
        <div className="flex items-center justify-between max-w-[80%] mx-auto py-3">
          <NavLink to="/">
            <h1 className="font-bold text-lg">Cannabud.</h1>
          </NavLink>
          <ul className="flex gap-10 text-gray-500">
            {navLinks.map(({ id, name, link, icon }) => (
              <NavLink
                to={link}
                key={id}
                className={({ isActive }) => `${isActive ? "text-white" : ""}`}
              >
                <li className="flex items-center gap-2 font-medium">
                  {icon}
                  {name}
                </li>
              </NavLink>
            ))}
          </ul>
          {currentUser ? (
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={signOutUser}
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
      <main className="bg-secondary flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Navigation;
