import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const variants = {
    open: { opacity: 1, height: "auto" },
    closed: { opacity: 0, height: 0 },
  };

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <nav className="bg-orange-400 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-32">
          <div className="flex">
            <div>
             
              <Link to="/" className="flex items-center pl-0">
                <span className="font-bold ml-0 text-3xl">Recipe Central</span>
              </Link>
            </div>

            <div className="hidden md:flex space-x-4 text-xl ml-80">
           

              <Link
                className="py-5 px-3 hover:bg-gray-800 rounded-md"
                to="/After-Login_recipeform"
              >
                Upload Recipe
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="mobile-menu-button">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            exit="closed"
            animate="open"
            variants={variants}
            transition={{ duration: 0.5 }}
            className="md:hidden bg-gray-800"
          >
          
            <Link
              className="block py-2 px-4 text-sm hover:bg-gray-700"
              to="/After-Login_recipeform"
            >
              Upload Recipe
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
