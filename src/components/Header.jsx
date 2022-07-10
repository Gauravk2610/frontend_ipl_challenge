import { BellIcon, MenuAlt1Icon, SearchIcon } from "@heroicons/react/outline";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { navbarState } from "../atom/navbarState";

function Header({ title }) {
  const [isOpen, setIsOpen] = useRecoilState(navbarState);

  function setWindowWidth() {
    var windowWidth = window.innerWidth
    if (windowWidth < 768) {
      setIsOpen(false);
    }
    if (windowWidth > 768) {
      setIsOpen(true);
    }
  }

  useEffect(() => {
    setWindowWidth()
    window.addEventListener("resize", setWindowWidth, false);
    return () => window.removeEventListener("resize", setWindowWidth, false);
  }, []);

  return (
    <div className="py-2 flex items-center justify-between space-x-4">
      <MenuAlt1Icon
        onClick={() => setIsOpen(!isOpen)} 
        className="w-7 h-7 md:hidden cursor-pointer" />
      <div className="hidden lg:inline-flex text-3xl">{title}</div>
      <div className="flex items-center w-full lg:justify-end space-x-4">
        {/* Input Wrapper */}
        <div className="flex w-full max-w-[380px]  items-center bg-opacity-60 bg-gray-700 py-2 px-3 space-x-2 rounded-xl">
          <SearchIcon className="w-5 h-5" />
          <input
            className="outline-none bg-transparent w-full"
            placeholder="Search.."
            type="text"
          />
        </div>
        <div>
          <motion.img
            whileTap={{ scale: 0.85 }}
            className="cursor-pointer hover:border-blue-700 w-full max-w-[40px] rounded-full object-cover border-2"
            src="/assets/profile.jpeg"
            alt=""
          />
        </div>
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="relative cursor-pointer"
        >
          <BellIcon className="w-8" />
          <div className="w-5 h-5 text-center flex items-center justify-center rounded-full absolute -top-2 -right-0 bg-blue-800">
            2
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Header;
