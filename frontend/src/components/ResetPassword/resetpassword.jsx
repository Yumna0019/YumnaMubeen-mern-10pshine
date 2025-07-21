// /resetpassword.
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-pink-200 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-[#C44265] mb-2">
          Reset Password
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Please enter your new password below.
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C44265]"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Re-enter new password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C44265]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-md text-white bg-[#C44265] hover:bg-[#a12f4e] font-semibold transition-all"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
