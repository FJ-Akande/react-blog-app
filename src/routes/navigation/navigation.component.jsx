import { useContext, useRef, useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { BsGlobeEuropeAfrica } from "react-icons/bs";
import { FaCircleQuestion } from "react-icons/fa6";
import Footer from "../../components/footer/footer.component";
import ProfileDropdown from "../../components/profile-dropdown/profile-dropdown.component";
import userDp from "../../assets/userdp.png";
import { UserContext } from "../../contexts/user.context";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      link: "/news",
      icon: <BsGlobeEuropeAfrica />,
    },
    {
      id: 3,
      name: "How It Works",
      link: "/how-it-works",
      icon: <FaCircleQuestion />,
    },
  ];

  //QuickQuestion

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed w-full top-0 bg-primary border-b border-gray-700 text-white">
        <div className="flex items-center justify-between max-w-[80%] mx-auto py-3">
          <NavLink to="/">
            <h1 className="font-bold text-lg">QuickQuestion</h1>
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
            <div className="relative">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={toggleDropdown}
              >
                <img
                  src={userDp}
                  alt="display-picture"
                  className="h-10 w-10 bg-black rounded-full"
                />
                <IoIosArrowDown className="text-xl text-gray-500" />
              </div>
              <ProfileDropdown
                ref={dropdownRef}
                isVisible={dropdownVisible}
                toggleDropdown={toggleDropdown}
              />
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
