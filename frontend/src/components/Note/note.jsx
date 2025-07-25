import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [editingNoteId, setEditingNoteId] = useState(null); 
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
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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

  const resetForm = () => {
    setFormData({ title: "", content: "" });
    setEditingNoteId(null);
    setShowPopup(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
        onClick={() => {
          setEditingNoteId(null); // reset edit mode
          setFormData({ title: "", content: "" });
          setShowPopup(true);
        }}
      >
        + Create Note
      </button>

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
            <textarea
              placeholder="Content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="w-full border p-2 mb-3 rounded h-24"
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

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
        {notes.map((note) => (
          <div key={note._id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{note.title}</h3>
            <p className="text-gray-700 mt-2">
              {note.content.substring(0, 100)}...
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {/* {new Date(note.updatedAt).toLocaleString()} */}
              {new Date(note.updatedAt).toLocaleString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true, 
              })}
            </p>
            <div className="flex justify-end mt-3 space-x-2">
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
