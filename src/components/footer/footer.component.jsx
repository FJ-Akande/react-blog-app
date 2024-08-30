import { MdEmail } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary border-t border-gray-700 text-text py-3 md:py-5">
      <div className="max-w-[80%] mx-auto md:flex md:items-center text-center space-y-3 md:space-y-0">
        <div className="flex items-center justify-center gap-3">
          <MdEmail
            className="text-2xl cursor-pointer"
            onClick={() =>
              (window.location.href = "mailto:fortunatusakande@gmail.com")
            }
          />
          <FaXTwitter
            className="text-2xl cursor-pointer"
            onClick={() =>
              window.open("https://twitter.com/niyitwts", "_blank")
            }
          />
          <FaGithub
            className="text-2xl cursor-pointer"
            onClick={() =>
              window.open("https://github.com/FJ-Akande", "_blank")
            }
          />
        </div>
        <p className="text-sm md:absolute md:left-1/2 md:-translate-x-1/2 font-medium">
          &copy; {new Date().getFullYear()} Cannabud. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
