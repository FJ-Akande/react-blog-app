import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { FaUser } from "react-icons/fa";
import { FaFile } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";

const ProfileDropdown = forwardRef(({ isVisible, toggleDropdown }, ref) => {
  return (
    <div
      ref={ref}
      className={`absolute right-0 md:mt-3 top-full w-full md:w-[260px] bg-primary border border-gray-700 rounded-b-xl md:rounded-xl text-white font-medium overflow-hidden ${
        isVisible ? "block" : "hidden"
      }`}
    >
      <Link
        to="/profile"
        className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-secondary"
        onClick={toggleDropdown}
      >
        <FaUser className="text-xl" />
        Profile
      </Link>
      <Link
        to="/my-posts"
        className="flex items-center gap-3 px-4 py-3 border-t border-b border-gray-700 text-sm hover:bg-secondary"
        onClick={toggleDropdown}
      >
        <FaFile className="text-xl" />
        My Posts
      </Link>
      <button
        onClick={() => {
          signOutUser();
          toggleDropdown();
        }}
        className="flex items-center gap-3 w-full text-left px-4 py-3 text-red-400 text-sm hover:bg-secondary"
      >
        <MdLogout className="text-xl" />
        Sign Out
      </button>
    </div>
  );
});

export default ProfileDropdown;
