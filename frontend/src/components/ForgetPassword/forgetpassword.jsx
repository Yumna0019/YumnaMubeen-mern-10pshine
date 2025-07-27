//forgetpassword
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [emailDisabled, setEmailDisabled] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/send-reset-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("OTP sent to your email");
        setShowOtpInput(true);
        setEmailDisabled(true);
      } else {
        toast.error(data.message || "Email not found");
      }
    } catch (err) {
      toast.error(err.data.message || "Server error");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return setError("Please enter the OTP");

    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Email verified successfulLY");
        navigate("/reset-password", { state: { email } });
      } else {
        toast.error(data.message || "OTP verification failed");
      }
    } catch (err) {
      toast.error(err.data.message || "Server error");

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-[#C44265] mb-2 text-center">
          Forgot Password
        </h2>
        <p className="text-gray-600 text-sm mb-6 text-center">
          Enter your email to receive a reset OTP
        </p>

        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              disabled={emailDisabled}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#C44265]"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="you@example.com"
              required
            />
          </div>

          {!showOtpInput && (
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-md text-sm text-gray-700 hover:underline"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-md text-white bg-[#C44265] hover:bg-[#a12f4e] text-sm font-semibold"
              >
                Send OTP
              </button>
            </div>
          )}
        </form>

        {showOtpInput && (
          <div className="mt-6 space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Enter 6-digit OTP sent to email
            </label>
            <input
              type="text"
              maxLength="6"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#C44265]"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />

            <button
              onClick={handleVerifyOtp}
              className="w-full py-2 rounded-md text-white bg-[#C44265] hover:bg-[#a12f4e] text-sm font-semibold"
            >
              Verify OTP
            </button>
          </div>
        )}

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      </div>
    </div>
  );
};

export default ForgetPassword;
