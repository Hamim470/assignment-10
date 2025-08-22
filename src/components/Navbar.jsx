import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { motion } from "framer-motion";
import NavbarBackground from "./NavbarBackground";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tabletMenuOpen, setTabletMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut().catch((error) => console.error(error));
  };

  const navLinks = (
    <>
      <motion.li whileHover={{ scale: 1.1 }}>
        <NavLink
          to="/"
          className="hover:text-blue-500 text-blue-800 bg-blue-100 py-1 px-3 rounded-sm hover:bg-blue-200 font-medium"
        >
          Home
        </NavLink>
      </motion.li>
      <motion.li whileHover={{ scale: 1.1 }}>
        <NavLink
          to="/all-tourist-spots"
          className="hover:text-blue-500 text-blue-800 bg-blue-100 py-1 px-3 rounded-sm hover:bg-blue-200 font-medium"
        >
          All Tourist Spots
        </NavLink>
      </motion.li>
      {user && (
        <>
          <motion.li whileHover={{ scale: 1.1 }}>
            <NavLink
              to="/add-tourist-spot"
              className="hover:text-blue-500 text-blue-800 bg-blue-100 py-1 px-3 rounded-sm hover:bg-blue-200 font-medium"
            >
              Add Tourist Spot
            </NavLink>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }}>
            <NavLink
              to="/my-list"
              className="hover:text-blue-500 text-blue-800 bg-blue-100 py-1 px-3 rounded-sm hover:bg-blue-200 font-medium"
            >
              My List
            </NavLink>
          </motion.li>
        </>
      )}
    </>
  );

  return (
    <motion.div
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full z-50"
    >
      {/* Navbar container with background */}
      <div className="relative w-full">
        <div className="absolute inset-0 h-full">
          <NavbarBackground />
        </div>

        <div className="navbar container mx-auto flex justify-between items-center px-4 py-3 relative z-10 text-white">
          {/* Logo */}
          <motion.div
            whileHover={{ rotate: -5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            <Link to="/" className="text-3xl font-bold text-blue-300">
              Explore<span className="text-green-400">Asia</span>
            </Link>
          </motion.div>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex space-x-6 text-lg">{navLinks}</ul>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <>
                <motion.img
                  src={user.photoURL || "https://i.ibb.co/4Y3QX7p/default-avatar.png"}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border object-cover"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Tablet Menu Button */}
          <div className="hidden md:flex lg:hidden items-center">
            <button
              onClick={() => setTabletMenuOpen(!tabletMenuOpen)}
              className="ml-4 relative z-20"
            >
              {tabletMenuOpen ? (
                <HiX className="w-8 h-8 text-black" />
              ) : (
                <HiMenu className="w-8 h-8 text-black" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="ml-4 relative z-20"
            >
              {mobileMenuOpen ? (
                <HiX className="w-8 h-8 text-black" />
              ) : (
                <HiMenu className="w-8 h-8 text-black" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tablet Sliding Menu */}
      <motion.div
        initial={{ y: -300, opacity: 0 }}
        animate={tabletMenuOpen ? { y: 0, opacity: 1 } : { y: -300, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="hidden md:flex lg:hidden absolute top-14 left-0 w-full bg-white bg-opacity-90 backdrop-blur-md shadow-lg z-40 md:justify-between"
      >
        <ul className="flex flex-col space-y-4 p-4 text-lg text-black">{navLinks}</ul>

        <div className="flex flex-col space-y-3 px-4 pb-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setTabletMenuOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setTabletMenuOpen(false)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </motion.div>

      {/* Mobile Sliding Menu */}
      <motion.div
        initial={{ y: -300, opacity: 0 }}
        animate={mobileMenuOpen ? { y: 0, opacity: 1 } : { y: -300, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="md:hidden absolute top-14 left-0 w-full bg-white bg-opacity-90 backdrop-blur-md shadow-lg z-30"
      >
        <ul className="flex flex-col space-y-4 p-4 text-lg text-black">{navLinks}</ul>

        <div className="flex flex-col space-y-3 px-4 pb-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Navbar;
