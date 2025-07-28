const express = require('express');
const { createNote, getNotes, updateNote, deleteNote, toggleFavorite } = require('../controllers/noteController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(protect, getNotes)
  .post(protect, createNote);

router.route('/:id')
  .put(protect, updateNote)
  .delete(protect, deleteNote);

router.route('/:id/favorite')
  .put(protect, toggleFavorite);

module.exports = router;
