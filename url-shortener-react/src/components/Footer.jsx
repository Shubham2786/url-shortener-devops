import React from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-white tracking-wider bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Shortify
          </span>
          <span className="text-xs text-slate-500">© 2026. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white transition-colors duration-200">
            About
          </a>
          <a href="#" className="hover:text-white transition-colors duration-200">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition-colors duration-200">
            Terms of Service
          </a>
        </div>
        <div className="flex gap-4">
          <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
            <FaGithub size={20} />
          </a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
