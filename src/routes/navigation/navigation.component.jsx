import { useContext, useRef, useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import Footer from "../../components/footer/footer.component";
import ProfileDropdown from "../../components/profile-dropdown/profile-dropdown.component";
import { IoIosArrowDown } from "react-icons/io";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { BsGlobeEuropeAfrica } from "react-icons/bs";
import { FaCircleQuestion } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";

const Navigation = () => {
  const { currentUser, currentUserProfile, defaultImageURL, loading } =
    useContext(UserContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !event.target.closest(".profile-dropdown")
    ) {
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
      <div className="fixed w-full top-0 z-50 bg-primary border-b border-gray-700 text-white">
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
            <div className="profile-dropdown relative">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={toggleDropdown}
              >
                {currentUserProfile?.imageURL ? (
                  <img
                    src={currentUserProfile?.imageURL || defaultImageURL}
                    alt="display-picture"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 bg-[#1f2937] rounded-full flex items-center justify-center">
                    <ClipLoader size={20} color={"#6b7280"} />
                  </div>
                )}
                <IoIosArrowDown className="text-xl text-gray-500" />
              </div>
              <ProfileDropdown
                ref={dropdownRef}
                isVisible={dropdownVisible}
                toggleDropdown={toggleDropdown}
              />
            </div>
          ) : loading ? (
            <div className="h-10 flex items-center justify-center">
              <ClipLoader size={22} color={"#6b7280"} />
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
