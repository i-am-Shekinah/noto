// HOW TO:
  // create a schema for the note
  // create a model off of that schema

import mongoose from 'mongoose';

// create a schema for the note
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// create a model off of that schema
const Note = mongoose.model('Note', noteSchema);


// Export the Note model
export default Note;