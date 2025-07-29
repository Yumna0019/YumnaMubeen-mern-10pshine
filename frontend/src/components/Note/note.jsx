import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import RichTextEditor from "../RichTextEditor/RichTextEditor";

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const token = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!hasShownToast.current && location.state?.toast) {
      toast.success(location.state.toast);
      hasShownToast.current = true;
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes", err);
    }
  };

  const handleCreateNote = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/notes",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes([res.data, ...notes]);
      resetForm();
    } catch (err) {
      console.error("Error creating note", err);
    }
  };

  const handleUpdateNote = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/notes/${editingNoteId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes(
        notes.map((note) => (note._id === editingNoteId ? res.data : note))
      );
      resetForm();
    } catch (err) {
      console.error("Error updating note", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Error deleting note", err);
    }
  };

  const handleEdit = (note) => {
    setFormData({ title: note.title, content: note.content });
    setEditingNoteId(note._id);
    setShowPopup(true);
  };

  const handleToggleFavorite = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/notes/${id}/favorite`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes(notes.map((note) => (note._id === id ? res.data : note)));
    } catch (err) {
      console.error("Error toggling favorite", err);
    }
  };

  const resetForm = () => {
    setFormData({ title: "", content: "" });
    setEditingNoteId(null);
    setShowPopup(false);
  };

  const filteredNotes = notes.filter((note) => {
    const titleMatch = note.title
      .toLowerCase()
      .startsWith(searchTerm.toLowerCase());

    const favoriteMatch = showFavorites ? note.isFavorite === true : true;

    return titleMatch && favoriteMatch;
  });

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-[#fef3f5] flex flex-col items-center px-4 sm:px-6 lg:px-24">
      {/* Header */}
      <div className="w-full flex justify-between items-center py-6">
        <h1 className="text-[#cf457f] text-2xl font-bold">My Notes</h1>
        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded-md w-48"
          />
          <button
            className="bg-yellow-400 text-white px-3 py-2 rounded-md hover:bg-yellow-500"
            onClick={() => setShowFavorites(!showFavorites)}
          >
            {showFavorites ? "All Notes" : "Favorite Notes"}
          </button>
          <button
            className="bg-[#e77f97] text-white px-4 py-2 rounded hover:bg-[#cf457f]"
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>
        </div>
      </div>

      {/* Create Note Button */}
      <button
        className="bg-[#4c8bc7] text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
        onClick={() => {
          setEditingNoteId(null); 
          setFormData({ title: "", content: "" });
          setShowPopup(true);
        }}
      >
        + Create Note
      </button>

      {/* Note Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-xl mb-4 font-semibold">
              {editingNoteId ? "Update Note" : "New Note"}
            </h2>
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full border p-2 mb-3 rounded"
            />
            <RichTextEditor
              content={formData.content}
              onChange={(value) => setFormData({ ...formData, content: value })}
            />
            <div className="flex justify-end space-x-2">
              <button onClick={resetForm} className="text-gray-600">
                Cancel
              </button>
              <button
                onClick={editingNoteId ? handleUpdateNote : handleCreateNote}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                {editingNoteId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notes List */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 w-full max-w-screen-xl">
        {filteredNotes.map((note) => (
          <div key={note._id} className="bg-white p-4 rounded shadow relative">
            {/* Favorite Heart */}
            <div
              className="absolute top-3 right-3 cursor-pointer text-xl"
              onClick={() => handleToggleFavorite(note._id)}
            >
              {note.isFavorite ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-gray-400 hover:text-red-400" />
              )}
            </div>

            <h3 className="text-lg font-semibold">{note.title}</h3>
            <div
              className="text-gray-700 mt-2 prose"
              dangerouslySetInnerHTML={{
                __html:
                  note.content.length > 100
                    ? `${note.content.substring(0, 100)}...`
                    : note.content,
              }}
            />

            <p className="text-sm text-gray-500 mt-2">
              {new Date(note.updatedAt).toLocaleString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
            <div className="flex justify-end mt-3 space-x-3">
              <button
                className="text-blue-500"
                onClick={() => handleEdit(note)}
              >
                Update
              </button>
              <button
                className="text-red-500"
                onClick={() => handleDelete(note._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Note;