import React, { useState } from "react";
import dayjs from "dayjs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaExternalLinkAlt, FaCalendarAlt, FaCopy, FaCheck } from "react-icons/fa";

const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdDate }) => {
  const [isCopied, setIsCopied] = useState(false);

  // Dynamic subdomain url: e.g. http://url.localhost:5173/7xYd3k2w
  const subdomainUrl = import.meta.env.VITE_SUBDOMAIN_URL || "http://url.localhost:5173";
  const fullShortUrl = `${subdomainUrl}/${shortUrl}`;
  
  // Clean URL for display: e.g. url.localhost:5173/7xYd3k2w
  const displayUrl = fullShortUrl.replace(/^(https?:\/\/)?(www\.)?/, "");

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-700/80 transition-all duration-300">
      <div className="space-y-1.5 flex-1 min-w-0 text-left">
        <div className="flex items-center gap-2">
          <a
            href={fullShortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 font-mono font-semibold text-sm truncate flex items-center gap-1.5"
          >
            {displayUrl}
            <FaExternalLinkAlt size={10} className="text-blue-500" />
          </a>
        </div>
        <p className="text-slate-500 text-xs truncate max-w-md">
          {originalUrl}
        </p>
      </div>

      <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
        {/* Clicks */}
        <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3.5 py-1.5 rounded-xl border border-emerald-500/10">
          <span className="text-xs font-semibold">
            {clickCount} {clickCount === 1 ? "click" : "clicks"}
          </span>
        </div>

        {/* Created Date */}
        <div className="flex items-center gap-2 text-slate-400 text-xs">
          <FaCalendarAlt className="text-slate-500" />
          <span>{dayjs(createdDate).format("MMM DD, YYYY")}</span>
        </div>

        {/* Copy Button */}
        <CopyToClipboard text={fullShortUrl} onCopy={handleCopy}>
          <button className="p-2.5 bg-slate-950 border border-slate-800 hover:border-blue-500/40 text-slate-400 hover:text-white rounded-xl transition-all duration-200 active:scale-95">
            {isCopied ? <FaCheck size={14} className="text-green-400" /> : <FaCopy size={14} />}
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default ShortenItem;
