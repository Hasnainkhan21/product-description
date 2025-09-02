// src/pages/Login.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const nav = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  // If user was redirected from signup with a success flag, show a small notice
  useEffect(() => {
    if (location.state?.signupSuccess) {
      setNotice("Account created successfully. Please log in.");
    }
  }, [location.state]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");

    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3005/api/auth/login", {
        email: form.email.trim(),
        password: form.password,
      });

      const data = res.data || {};

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("User", JSON.stringify(data.User));
        nav("/dashboard", { replace: true });
        return;
      }

      if (data.success) {
        nav("/dashboard", { replace: true });
        return;
      }

      setError(data.message || "Login failed. Please check your credentials.");
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Error during login.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-200">
      <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md border border-blue-200">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-4">
          Welcome Back 
        </h2>
        <p className="text-center text-gray-600 mb-4">Log in to manage your AI store</p>

        {/* Notice / Error */}
        {notice && (
          <div className="mb-4 text-sm p-3 rounded-md bg-green-100 text-green-700 border border-green-200">
            {notice}
          </div>
        )}
        {error && (
          <div className="mb-4 text-sm p-3 rounded-md bg-red-100 text-red-700 border border-red-200">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={submit}>
          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={onChange}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-white/70"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <input
              name="password"
              value={form.password}
              onChange={onChange}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg border border-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-white/70"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition duration-300 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-gray-700 mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
