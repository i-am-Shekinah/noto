import dotenv from 'dotenv';
import express from 'express';

import { connectDB } from './config/db.js';
import noteRoutes from './routes/noteRoutes.js';

const app = express();

dotenv.config();
connectDB();
const port = process.env.PORT || 3000;

app.use('/api/notes', noteRoutes);


app.listen(port, () => console.log(`Server is running on port ${port}`));

// mongodb+srv://michaeloluwayemi:0RlBpnjkbPwIkt0p@cluster0.6mbtbzh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0