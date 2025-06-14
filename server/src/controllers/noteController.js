import mongoose from 'mongoose';

import Note from '../models/Note.js';

export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error('Error in getAllNotes controller:', error);
    res.status(500).json({
      message: 'Error fetching notes',
      error: error.message
    });
  }
}

export async function getNoteById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid note ID', description: 'The provided ID is an invalid MongoDB ID...' });

    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    res.status(200).json(note);
  } catch (error) {
    console.error('Error in getNoteById controller:', error);
    res.status(500).json({
      message: 'Error fetching note',
      error: error.message
    });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json({
      message: 'Note created successfully',
      note: newNote,
    });
  } catch (error) {
    console.error('Error in createNote controller:', error);
    res.status(500).json({
      message: 'Error creating note',
      error: error.message
    });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid note ID' }); // checks if the ID is valid

    const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, {new: true});
    if (!updatedNote) return res.status(404).json({ message: 'Note not found', description: 'The provided ID is an invalid MongoDB ID...' });

    res.status(200).json({
      message: 'Note updated successfully',
      note: updatedNote,
    });
  } catch (error) {
    console.error('Error in updateNote controller:', error);
    res.status(500).json({
      message: 'Error updating note',
      error: error.message
    });    
  }
}

export async function deleteNote(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid note ID', description: 'The provided ID is an invalid MongoDB ID...' });

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) return res.status(404).json({ message: 'Note not found' });

    return res.status(200).json({
      message: 'Note deleted successfully',
    });
  } catch (error) {
    console.error('Error in updateNote controller:', error);
    res.status(500).json({
      message: 'Error updating note',
      error: error.message
  });    
  }
}