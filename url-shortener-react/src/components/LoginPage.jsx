import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useStoreContext } from "../context/ContextApi";
import api from "../api/api";
import toast from "react-hot-toast";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { setToken } = useStoreContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await api.post("/api/auth/login", { username, password });
      // response.data should contain the token inside it, i.e. response.data.token
      const token = response.data.token;
      if (token) {
        setToken(token);
        toast.success("Welcome back! Login successful.");
        navigate("/dashboard");
      } else {
        toast.error("Login failed. No token received.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 text-white min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Decorative ambient background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -ml-10 -mb-10"></div>

        <div className="text-center relative">
          <h2 className="text-3xl font-extrabold tracking-tight">Login</h2>
          <p className="text-sm text-slate-400 mt-2">
            Enter your credentials to access your dashboard.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5 relative">
          <div className="space-y-1 text-left">
            <label className="text-xs text-slate-400 font-semibold tracking-wider uppercase">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                <FaUser size={14} />
              </span>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors duration-200"
              />
            </div>
          </div>

          <div className="space-y-1 text-left">
            <label className="text-xs text-slate-400 font-semibold tracking-wider uppercase">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                <FaLock size={14} />
              </span>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors duration-200"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 shadow-lg shadow-blue-500/10"
          >
            {loading ? "Logging in..." : (
              <>
                Login <FaSignInAlt size={14} />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-sm text-slate-400 border-t border-slate-800/80 pt-4 relative">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 font-medium hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
