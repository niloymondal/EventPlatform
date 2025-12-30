import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await API.post("/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-md mx-auto mt-20 bg-slate-50 border border-slate-200 rounded-lg p-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-slate-900 mb-6">
        Sign in to your account
      </h2>

      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition"
        />
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-slate-900 text-white text-sm font-medium py-2.5 rounded-md hover:bg-slate-800 transition"
      >
        Sign In
      </button>
    </form>
  );
}
