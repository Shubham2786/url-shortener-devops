import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useStoreContext } from "../../context/ContextApi";
import { useFetchTotalClicks, useFetchMyShortUrls } from "../../hooks/useQuery";
import Graph from "./Graph";
import ShortenUrlList from "./ShortenUrlList";
import api from "../../api/api";
import toast from "react-hot-toast";
import { FaPlus, FaLink, FaChartLine, FaInfoCircle, FaTimes, FaCopy, FaCheck } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token } = useStoreContext();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortenedResult, setShortenedResult] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Redirect to login if token is missing
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleQueryError = (err) => {
    console.error(err);
    toast.error("Session expired or failed to fetch dashboard data.");
    navigate("/login");
  };

  // Queries
  const {
    data: totalClicks,
    isLoading: clicksLoading,
    error: clicksError,
  } = useFetchTotalClicks(token, handleQueryError);

  const {
    data: myUrls,
    isLoading: urlsLoading,
    error: urlsError,
  } = useFetchMyShortUrls(token, handleQueryError);

  const totalClicksSum = myUrls
    ? myUrls.reduce((sum, url) => sum + url.clickCount, 0)
    : 0;

  const handleShorten = async (e) => {
    e.preventDefault();
    if (!originalUrl) {
      toast.error("Please enter a URL to shorten.");
      return;
    }
    setSubmitting(true);
    try {
      const response = await api.post("/api/urls/shorten", { originalUrl, customAlias });
      setShortenedResult(response.data.shortUrl);
      toast.success("URL Shortened Successfully!");
      
      // Invalidate queries to trigger refresh
      queryClient.invalidateQueries(["fetch-my-short-urls", token]);
      queryClient.invalidateQueries(["fetch-total-clicks", token]);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to shorten URL.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setOriginalUrl("");
    setCustomAlias("");
    setShortenedResult(null);
    setIsCopied(false);
  };

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const subdomainUrl = import.meta.env.VITE_SUBDOMAIN_URL || "http://url.localhost:5173";

  if (clicksLoading || urlsLoading) {
    return (
      <div className="bg-slate-950 text-white min-h-[calc(100vh-140px)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mr-3"></div>
        <p className="text-slate-400">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-white min-h-[calc(100vh-140px)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-left">
            <h1 className="text-3xl font-extrabold tracking-tight">Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">
              Manage your shorten links and analyze performance.
            </p>
          </div>
          <button
            onClick={() => setIsPopupOpen(true)}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold shadow-lg shadow-blue-500/10 flex items-center gap-2 transition-all duration-200 active:scale-95"
          >
            <FaPlus size={14} /> Create Short URL
          </button>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center gap-5 text-left relative overflow-hidden group">
            <div className="p-4 bg-blue-500/10 text-blue-400 rounded-2xl group-hover:bg-blue-500 group-hover:text-white transition-all duration-355">
              <FaLink className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Links Created</p>
              <h3 className="text-3xl font-bold mt-1">{myUrls ? myUrls.length : 0}</h3>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center gap-5 text-left relative overflow-hidden group">
            <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all duration-355">
              <FaChartLine className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Clicks</p>
              <h3 className="text-3xl font-bold mt-1">{totalClicksSum}</h3>
            </div>
          </div>
        </div>

        {/* Visual Charts and Url Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left / Chart Section */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between min-h-[400px]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold tracking-wide text-left">Clicks Timeline</h2>
            </div>
            <div className="flex-grow flex items-center justify-center relative">
              {(!totalClicks || totalClicks.length === 0) ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 z-10 p-6">
                  <FaInfoCircle size={32} className="text-slate-600 mb-3" />
                  <h3 className="text-base font-bold text-slate-400">No data for this time period</h3>
                  <p className="text-slate-500 text-xs text-center mt-1 max-w-xs">
                    Share your short links to view where your engagements are coming from.
                  </p>
                </div>
              ) : null}
              <Graph graphData={totalClicks} />
            </div>
          </div>

          {/* Right / Listings Section */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between">
            <div className="mb-6">
              <h2 className="text-lg font-bold tracking-wide text-left">Your Links</h2>
            </div>
            <div className="flex-grow overflow-y-auto max-h-[340px] pr-2 custom-scrollbar">
              {(!myUrls || myUrls.length === 0) ? (
                <div className="h-full flex flex-col items-center justify-center py-12">
                  <FaLink size={28} className="text-slate-700 mb-3" />
                  <p className="text-slate-500 text-sm font-medium">You haven't created any links yet.</p>
                </div>
              ) : (
                <ShortenUrlList data={myUrls} />
              )}
            </div>
          </div>
        </div>

        {/* Shorten Popup Modal */}
        {isPopupOpen && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-6 relative shadow-2xl space-y-6 animate-in fade-in zoom-in duration-200">
              
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Shorten a Long Link</h3>
                <button
                  onClick={handleClosePopup}
                  className="p-1.5 bg-slate-950 border border-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
                >
                  <FaTimes size={14} />
                </button>
              </div>

              {!shortenedResult ? (
                <form onSubmit={handleShorten} className="space-y-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                      Destination URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://example.com/very-long-url-path"
                      value={originalUrl}
                      onChange={(e) => setOriginalUrl(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                      Custom Alias (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. myblog"
                      value={customAlias}
                      onChange={(e) => setCustomAlias(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
                  >
                    {submitting ? "Shortening..." : "Shorten URL"}
                  </button>
                </form>
              ) : (
                <div className="space-y-5 text-left">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Original URL</p>
                    <p className="text-slate-500 text-xs truncate bg-slate-950 px-3 py-2.5 rounded-lg border border-slate-850">
                      {originalUrl}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Your Short Link</p>
                    <div className="flex gap-2">
                      <div className="flex-grow bg-blue-500/5 border border-blue-500/20 rounded-xl py-2.5 px-4 text-sm font-mono font-medium text-blue-300 truncate">
                        {`${subdomainUrl}/${shortenedResult}`}
                      </div>
                      <CopyToClipboard text={`${subdomainUrl}/${shortenedResult}`} onCopy={handleCopy}>
                        <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all">
                          {isCopied ? <FaCheck size={14} /> : <FaCopy size={14} />}
                        </button>
                      </CopyToClipboard>
                    </div>
                  </div>

                  <button
                    onClick={handleClosePopup}
                    className="w-full py-3.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-sm font-semibold rounded-xl flex items-center justify-center transition-all"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
