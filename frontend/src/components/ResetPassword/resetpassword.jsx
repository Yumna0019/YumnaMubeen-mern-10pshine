import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {toast} from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!email) return toast.error("No email found. Go back to forgot password.");
  if (password !== confirmPassword) return toast.error("Password does not match");

  try {
    const res = await fetch("http://localhost:5000/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      // Store token in localStorage
      localStorage.setItem("token", data.token);

      toast.success("Password Reset successfully");
      navigate("/note-dashboard");
    } else {
      toast.error(data.message || "Reset failed");
    }
  } catch (err) {
    toast.error(err.data.message || "Server error");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-pink-200 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-[#C44265] mb-2">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full py-2 bg-[#C44265] text-white rounded-md">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
