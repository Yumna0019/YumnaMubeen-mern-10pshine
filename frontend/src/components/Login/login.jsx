//  login..
import React, { useState } from "react";
import "@fontsource/poppins";
import { EnvelopeIcon, LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline";
import bg from "../../assets/backgroung_img.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/login", formData);
      alert("Login successful");
      navigate("/note-dashboard");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      alert(msg);
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat px-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl p-8 shadow-xl text-white">
        {/* App Branding */}
        <h1 className="text-center text-3xl font-bold mb-2 text-[#FFD1DC] tracking-wide">Note App</h1>
        <p className="text-center text-sm text-white/80 mb-8">Welcome back to your private notebook</p>

        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Email */}
          <div className="relative border-b-2 border-white group">
            <EnvelopeIcon className="absolute right-2 top-4 w-5 h-5 text-[#FFD1DC]" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="peer w-full h-12 bg-transparent outline-none text-white px-1 pr-8"
            />
            <label className="absolute left-1 top-1/2 transform -translate-y-1/2 text-white/80 font-medium text-sm transition-all duration-300 
              peer-focus:top-[-8px] peer-focus:text-sm 
              peer-valid:top-[-8px] peer-valid:text-sm
              group-hover:top-[-8px]">
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative border-b-2 border-white group">
            {showPassword ? (
              <LockOpenIcon
                onClick={togglePassword}
                className="absolute right-2 top-4 w-5 h-5 text-[#FFD1DC] cursor-pointer"
              />
            ) : (
              <LockClosedIcon
                onClick={togglePassword}
                className="absolute right-2 top-4 w-5 h-5 text-[#FFD1DC] cursor-pointer"
              />
            )}
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="peer w-full h-12 bg-transparent outline-none text-white px-1 pr-8"
            />
            <label className="absolute left-1 top-1/2 transform -translate-y-1/2 text-white/80 font-medium text-sm transition-all duration-300 
              peer-focus:top-[-8px] peer-focus:text-sm 
              peer-valid:top-[-8px] peer-valid:text-sm
              group-hover:top-[-8px]">
              Password
            </label>
          </div>

          {/* Forgot password */}
          <div className="flex justify-between text-sm text-white/80">
            <Link to="/forget-password" className="hover:underline hover:text-[#672541]">Forgot Password?</Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-full bg-[#FFD1DC] text-[#271B29] font-semibold hover:bg-[#C44265] transition-all"
          >
            Log in
          </button>

          {/* Signup Prompt */}
          <div className="text-sm text-center mt-4">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold text-[#FFD1DC] hover:underline hover:text-[#C44265]">
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
