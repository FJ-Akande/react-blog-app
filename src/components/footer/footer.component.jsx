import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary border-t border-gray-700 text-text py-5">
      <div className="max-w-[80%] mx-auto flex items-center">
        <div className="flex items-center gap-3">
          <FaXTwitter className="text-2xl cursor-pointer" />
          <FaGithub className="text-2xl cursor-pointer" />
        </div>
        <p className="text-sm absolute left-1/2 -translate-x-1/2 font-medium">
          &copy; {new Date().getFullYear()} Cannabud. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;