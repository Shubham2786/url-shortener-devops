import React from "react";
import { FaGlobe, FaChartLine, FaShieldAlt } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="bg-slate-950 text-white min-h-[calc(100vh-140px)] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-6">
          About Shortify
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Shortify is a next-generation URL shortening and analytics platform. We empower you to share links easily while providing real-time data insights into your audience's behavior.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center hover:border-blue-500/30 transition-all duration-300">
          <div className="mx-auto w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-6">
            <FaGlobe className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-3">Global Reach</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Shorten and distribute links globally. Our fast redirection engine ensures your audience is redirected instantly, no matter their location.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center hover:border-indigo-500/30 transition-all duration-300">
          <div className="mx-auto w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 mb-6">
            <FaChartLine className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-3">Detailed Analytics</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Track clicks dynamically. Get clean, interactive visualizations representing total clicks and access timelines grouped by date.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center hover:border-purple-500/30 transition-all duration-300">
          <div className="mx-auto w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-6">
            <FaShieldAlt className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-3">Secure & Scalable</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Protected by advanced JWT authentication. Rest assured that your URL repository and traffic metrics are secure and accessible only to you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
