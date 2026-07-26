"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/api/auth/login", {
        email,
        password,
      });

      const token = res.data?.token;

      if (token) {
        localStorage.setItem("token", token);
      }

      toast.success("Login successful!");
      router.push("/admin/dashboard");
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-8 sm:px-6">
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-2xl shadow-black/40 p-6 sm:p-8 border border-slate-200">

        {/* Logo / Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-900 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 sm:w-8 sm:h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3 1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm0 0c-2.5 0-6 1.25-6 4v1h12v-1c0-2.75-3.5-4-6-4z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 tracking-tight">
          Admin Login
        </h1>

        <p className="text-center text-slate-500 text-sm mt-1 mb-6 sm:mb-8">
          Sign in to access the admin dashboard
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-4 sm:space-y-5"
        >
          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              className="w-full border border-slate-300 rounded-lg p-2.5 sm:p-3 text-sm sm:text-base text-black outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              className="w-full border border-slate-300 rounded-lg p-2.5 sm:p-3 text-sm sm:text-base text-black outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed text-white p-2.5 sm:p-3 rounded-lg font-medium text-sm sm:text-base transition"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-6">
          Authorized personnel only
        </p>

      </div>
    </div>
  );
}