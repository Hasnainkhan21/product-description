import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './Signup.css';


export default function Signup() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Please complete all fields.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (res.data.success) {
        nav("/login");
      } else {
        setError(res.data.message || "Signup failed.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Create account
          </h1>
          <p className="text-sm text-gray-500">
            Open a seller account at AI Commerce
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          {error && <div className="text-red-600 text-sm">{error}</div>}

          <div>
            <label className="text-sm text-gray-600">Full name</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              type="text"
              placeholder="John Doe"
              className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={onChange}
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              name="password"
              value={form.password}
              onChange={onChange}
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Confirm password</label>
            <input
              name="confirm"
              value={form.confirm}
              onChange={onChange}
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already registered?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
