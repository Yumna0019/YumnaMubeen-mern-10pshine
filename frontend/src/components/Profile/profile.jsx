import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user info", err);
      }
    };

    fetchUser();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const goBackToNotes = () => {
    navigate("/note-dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fef3f5]">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center relative">
        <h1 className="text-[#cf457f] text-2xl font-bold mb-6">Profile</h1>

        {user ? (
          <>
            <p className="text-[#13080d] mb-3">
              <strong>Name:</strong>
              <span className="text-[#000] ml-2">{user.name}</span>
            </p>
            <p className="text-[#13080d] mb-6">
              <strong>Email:</strong>
              <span className="text-[#000] ml-2">{user.email}</span>
            </p>

            <div className="space-x-4">
              <button
                className="border border-[#c56c81] text-[#c56c81] px-4 py-2 rounded hover:bg-[#cf457f] hover:text-white transition"
                onClick={goBackToNotes}
              >
                Back to Notes
              </button>

              <button
                className="border border-[#c56c81] text-[#c56c81] px-4 py-2 rounded hover:bg-[#cf457f] hover:text-white transition"
                onClick={() => setShowLogoutModal(true)}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}

        {/* Logout Confirmation Modal */}
        {showLogoutModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md text-center max-w-sm w-full">
              <p className="text-lg text-[#13080d] mb-4">Are you sure you want to logout?</p>
              <div className="flex justify-center space-x-4">
                <button
                  className="bg-[#cf457f] text-white px-4 py-2 rounded hover:bg-[#b83e6e] transition"
                  onClick={handleLogout}
                >
                  Yes
                </button>
                <button
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                  onClick={() => setShowLogoutModal(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
