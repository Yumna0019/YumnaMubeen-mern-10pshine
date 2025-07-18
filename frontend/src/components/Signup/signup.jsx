// signup
import React, { useState } from "react";
import "@fontsource/poppins";
import {
  EnvelopeIcon,
  LockClosedIcon,
  LockOpenIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import bg from "../../assets/backgroung_img.jpg";
import { Link } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat px-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl p-8 shadow-xl text-white">
        {/* App Branding */}
        <h1 className="text-center text-3xl font-bold mb-2 text-[#FFD1DC] tracking-wide">
          Note App
        </h1>
        <p className="text-center text-sm text-white/80 mb-8">
          Create your account to start writing notes
        </p>

        <form className="space-y-6">
          {/* Name */}
          <div className="relative border-b-2 border-white group">
            <UserIcon className="absolute right-2 top-4 w-5 h-5 text-[#FFD1DC]" />
            <input
              type="text"
              required
              className="peer w-full h-12 bg-transparent outline-none text-white px-1 pr-8"
            />
            <label
              className="absolute left-1 top-1/2 transform -translate-y-1/2 text-white/80 font-medium text-sm transition-all duration-300 
    peer-focus:top-[-8px] 
    peer-valid:top-[-8px] 
    group-hover:top-[-8px]"
            >
              Name
            </label>
          </div>

          {/* Email */}
          <div className="relative border-b-2 border-white group">
            <EnvelopeIcon className="absolute right-2 top-4 w-5 h-5 text-[#FFD1DC]" />
            <input
              type="email"
              required
              className="peer w-full h-12 bg-transparent outline-none text-white px-1 pr-8"
            />
            <label
              className="absolute left-1 top-1/2 transform -translate-y-1/2 text-white/80 font-medium text-sm transition-all duration-300 
              peer-focus:top-[-8px] peer-focus:text-sm 
              peer-valid:top-[-8px] peer-valid:text-sm
              group-hover:top-[-8px]"
            >
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
              required
              className="peer w-full h-12 bg-transparent outline-none text-white px-1 pr-8"
            />
            <label
              className="absolute left-1 top-1/2 transform -translate-y-1/2 text-white/80 font-medium text-sm transition-all duration-300 
              peer-focus:top-[-8px] peer-focus:text-sm 
              peer-valid:top-[-8px] peer-valid:text-sm
              group-hover:top-[-8px]"
            >
              Password
            </label>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-full bg-[#FFD1DC] text-[#271B29] font-semibold hover:bg-[#C44265] transition-all"
          >
            Sign up
          </button>

          {/* Login Link */}
          <div className="text-sm text-center mt-4">
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#FFD1DC] hover:underline hover:text-[#C44265]"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
