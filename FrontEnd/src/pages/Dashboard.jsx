import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-gray-800 font-sans antialiased">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-start">
        {/* Hero Section */}
        <div className="w-full bg-gradient-to-r from-indigo-100 via-white to-purple-100 flex flex-col items-center justify-center text-center py-16 px-4 md:py-24 shadow-lg rounded-b-3xl">
          <div className="max-w-4xl mx-auto backdrop-blur-sm p-8 md:p-12 rounded-3xl transform transition-all duration-500 hover:scale-[1.01] border border-indigo-100 shadow-xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-indigo-800 mb-4 animate-fade-in">
              Supercharge Your E-commerce Workflow
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8 animate-fade-in delay-200">
              The AI E-commerce Manager effortlessly turns your product photos into
              compelling, market-ready descriptions.
            </p>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
              <Link
                to="/products/upload"
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                Upload Product
              </Link>
              <Link
                to="/products/list"
                className="flex items-center gap-2 bg-white text-indigo-700 font-semibold py-3 px-8 rounded-full border border-indigo-300 shadow-md transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                View Products
              </Link>
            </div>
          </div>
        </div>

        {/* Value Proposition Section */}
        <div className="w-full py-12 px-4 md:px-8 bg-transparent">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Upload */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-indigo-100 transform transition-transform duration-300 hover:scale-105 hover:border-indigo-300">
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-indigo-700 mb-2">
                Upload Your Products
              </h3>
              <p className="text-gray-600">
                Easily upload single images or entire product catalogs to get started.
              </p>
            </div>

            {/* Card 2: AI Magic */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-indigo-100 transform transition-transform duration-300 hover:scale-105 hover:border-indigo-300">
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m14-6h2m-2 6h2M12 21a9 9 0 100-18 9 9 0 000 18z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-indigo-700 mb-2">
                AI-Powered Descriptions
              </h3>
              <p className="text-gray-600">
                Our advanced AI analyzes your images to write unique, accurate descriptions.
              </p>
            </div>

            {/* Card 3: Export */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-indigo-100 transform transition-transform duration-300 hover:scale-105 hover:border-indigo-300">
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2v-1h14v1a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-indigo-700 mb-2">
                Ready to Go
              </h3>
              <p className="text-gray-600">
                Copy and paste your new descriptions, or export them in bulk to your store.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full text-center text-gray-500 text-sm py-8 border-t border-gray-200 mt-auto">
          &copy; 2025 AI E-commerce Manager. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
