import React from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-950 text-white min-h-[calc(100vh-140px)] flex flex-col items-center justify-center px-4 text-center">
      <div className="p-4 bg-red-500/10 text-red-400 rounded-full mb-6">
        <FaExclamationTriangle size={48} />
      </div>
      <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
        Something Went Wrong
      </h1>
      <p className="text-slate-400 max-w-md mb-8 leading-relaxed">
        We encountered an error, or the page you are trying to reach does not exist. Please check the URL or head back home.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl font-medium flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
      >
        <FaHome size={14} /> Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;
