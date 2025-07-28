const Note = require('../models/Note');

// Create
const createNote = async (req, res) => {
  try {
    const note = new Note({ ...req.body, user: req.user._id });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Error creating note' });
  }
};

// Read
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notes' });
  }
};

// Update
const updateNote = async (req, res) => {
  try {
    const updated = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating note' });
  }
};

// Delete
const deleteNote = async (req, res) => {
  try {
    await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting note' });
  }
};

module.exports = { createNote, getNotes, updateNote, deleteNote };
