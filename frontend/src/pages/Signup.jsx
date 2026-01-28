import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import api from "../services/api";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default user

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/signup", {
        name,
        email,
        password,
        role,
      });

      // after successful signup → go to login
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-semibold mb-2">Create an account ✨</h2>
      <p className="text-gray-500 mb-6">
        Sign up to start managing tasks efficiently.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Optional: role selector (helps testing fast) */}
        <select
          className="w-full px-4 py-2 border rounded-lg"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:opacity-90"
        >
          Sign Up
        </button>
      </form>

      <p className="text-center text-sm mt-4 text-gray-500">
        Already have an account?{" "}
        <Link to="/login" className="text-primary font-medium">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Signup;
