import express from 'express';

import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/noteController.js';

const router = express.Router();

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Retrieve all notes
 *     tags: [Notes]
 *     responses:
 *      '200':
 *        description: A list of notes
 *      '500':
 *        description: Error fetching notes
 */
router.get('/', getAllNotes);


/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Get a note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The note ID
 *     responses:
 *       200:
 *         description: The requested note
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Note not found
 */
router.get('/:id', getNoteById);


/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Note created
 *       500:
 *         description: Error creating note
 */
router.post('/', createNote);


/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: Update a note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The note ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note updated
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Note not found
 */
router.put('/:id', updateNote);


/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Delete a note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The note ID
 *     responses:
 *       200:
 *         description: Note deleted
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Note not found
 */
router.delete('/:id', deleteNote);


export default router; 
