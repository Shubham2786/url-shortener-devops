import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/AboutPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import ErrorPage from "./components/ErrorPage";
import ShortenUrlPage from "./components/ShortenUrlPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-slate-950 text-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardLayout />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export const SubDomainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:URL" element={<ShortenUrlPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
