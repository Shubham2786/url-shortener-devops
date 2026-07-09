import React from "react";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../context/ContextApi";
import Card from "./Card";
import { FaLink, FaChartBar, FaLock, FaCheckCircle, FaChevronRight } from "react-icons/fa";

const LandingPage = () => {
  const navigate = useNavigate();
  const { token } = useStoreContext();

  const handleGetStarted = () => {
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="bg-slate-950 text-white min-h-[calc(100vh-140px)] flex flex-col justify-between">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8 text-left">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Shorten Links. <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Track Analytics.
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
            Shortify simplifies URL management, offering robust link shortening combined with comprehensive visual click analytics.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleGetStarted}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl font-medium shadow-lg shadow-blue-500/20 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Get Started <FaChevronRight size={14} />
            </button>
            <button
              onClick={() => navigate("/about")}
              className="px-8 py-4 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl font-medium hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Right Graphic (Premium Interactive Illustration) */}
        <div className="relative w-full h-[360px] sm:h-[400px] flex items-center justify-center bg-gradient-to-tr from-blue-500/10 via-indigo-500/5 to-transparent rounded-3xl border border-slate-800/80 overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>
          {/* Simulated App Card */}
          <div className="relative w-[85%] bg-slate-900 border border-slate-700/50 rounded-2xl p-6 shadow-2xl space-y-4 hover:scale-[1.03] transition-all duration-500">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs text-slate-500 font-mono">shortify.com/dashboard</span>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70"></div>
              </div>
            </div>
            {/* Input Mock */}
            <div className="h-10 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between px-3">
              <span className="text-xs text-slate-400 truncate">https://very-long-url-to-be-shortened.com/nested-path</span>
              <span className="text-xs text-blue-400 font-medium">Shorten</span>
            </div>
            {/* Shortened URL Output Mock */}
            <div className="h-10 bg-blue-500/5 border border-blue-500/20 rounded-lg flex items-center justify-between px-3">
              <span className="text-xs text-blue-300 font-mono font-medium">shortify.com/s/7xYd3k2w</span>
              <span className="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded font-mono">Copied</span>
            </div>
            {/* Chart Preview Mock */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] text-slate-500">
                <span>Clicks Over Time</span>
                <span className="text-green-400 font-medium">+142%</span>
              </div>
              <div className="flex items-end gap-1.5 h-16 pt-3">
                <div className="w-full h-8 bg-blue-500/25 rounded-sm"></div>
                <div className="w-full h-12 bg-blue-500/40 rounded-sm"></div>
                <div className="w-full h-10 bg-blue-500/35 rounded-sm"></div>
                <div className="w-full h-14 bg-blue-500/60 rounded-sm"></div>
                <div className="w-full h-16 bg-blue-500 rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted By Section */}
      <div className="border-y border-slate-900 bg-slate-950/50 py-8 text-center">
        <p className="text-sm text-slate-500 font-semibold tracking-wider uppercase mb-4">
          Trusted by developers and creators at
        </p>
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-x-12 gap-y-4 text-slate-600 text-lg font-bold tracking-widest">
          <span className="hover:text-slate-400 transition-colors duration-200 cursor-default">GITHUB</span>
          <span className="hover:text-slate-400 transition-colors duration-200 cursor-default">NETFLIX</span>
          <span className="hover:text-slate-400 transition-colors duration-200 cursor-default">SPOTIFY</span>
          <span className="hover:text-slate-400 transition-colors duration-200 cursor-default">VERCEL</span>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
          Everything You Need in One Place
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto mb-12">
          Experience link shortening combined with real-time performance logging and interactive charts.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            title="Sleek URL Shortening"
            description="Generate a highly compact, secure 8-character unique mapping instantly."
            icon={FaLink}
          />
          <Card
            title="Real-Time Analytics"
            description="Track date-wise click logs and visualize daily performance timelines."
            icon={FaChartBar}
          />
          <Card
            title="JWT Protected"
            description="Every endpoint, repository action, and redirection stats are securely authenticated."
            icon={FaLock}
          />
          <Card
            title="Dynamic Sharing"
            description="One-click copy, dynamic status codes, and seamless 302 redirects."
            icon={FaCheckCircle}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
