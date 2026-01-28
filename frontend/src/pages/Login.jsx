import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post("/auth/login", { email, password });
    login(res.data);

    res.data.user.role === "admin"
      ? navigate("/admin")
      : navigate("/dashboard");
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-semibold mb-2">Welcome back 👋</h2>
      <p className="text-gray-500 mb-6">
        Log in to manage your tasks and track progress.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Email address</label>
          <input
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="text-right text-sm text-red-500 cursor-pointer">
          Forgot your password?
        </div>

        <button className="w-full bg-primary text-white py-2 rounded-lg hover:opacity-90 transition">
          Sign In
        </button>
      </form>

      <p className="text-center text-sm mt-4 text-gray-500">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-primary font-medium">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
