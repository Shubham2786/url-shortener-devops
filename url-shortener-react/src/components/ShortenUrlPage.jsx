import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const ShortenUrlPage = () => {
  const { URL } = useParams();

  useEffect(() => {
    if (URL) {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
      window.location.href = `${backendUrl}/${URL}`;
    }
  }, [URL]);

  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-slate-400 text-sm font-medium tracking-wide">
        Redirecting you to the destination...
      </p>
    </div>
  );
};

export default ShortenUrlPage;
