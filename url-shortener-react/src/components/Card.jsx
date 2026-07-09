import React from "react";

const Card = ({ title, description, icon: Icon }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700/60 p-6 rounded-2xl hover:border-blue-500/50 hover:bg-slate-800/80 transition-all duration-300 group">
      {Icon && (
        <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl w-fit mb-4 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-200">
        {title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default Card;
