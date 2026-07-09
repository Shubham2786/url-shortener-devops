import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStoreContext } from "../context/ContextApi";
import { FaLink } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useStoreContext();

  const handleLogout = () => {
    setToken(null);
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <div className="p-2 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-lg text-white">
              <FaLink className="w-4 h-4" />
            </div>
            <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Shortify
            </span>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-6">
            <Link to="/about" className="text-slate-300 hover:text-white text-sm font-medium transition-colors duration-200">
              About
            </Link>

            {token ? (
              <>
                <Link to="/dashboard" className="text-slate-300 hover:text-white text-sm font-medium transition-colors duration-200">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-sm font-medium rounded-lg transition-colors duration-200"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-slate-300 hover:text-white text-sm font-medium transition-colors duration-200">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-sm font-medium rounded-lg transition-colors duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
