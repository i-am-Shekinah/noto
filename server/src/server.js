import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';

import { connectDB } from './config/db.js';
import {
  swaggerSpec,
  swaggerUi,
} from './config/swagger.js';
import rateLimiter from './middleware/rateLimiter.js';
import noteRoutes from './routes/noteRoutes.js';

const app = express();
app.set('trust proxy', 1);
dotenv.config();
const port = process.env.PORT || 3000;
const __dirname = path.resolve();

if (process.env.NODE_ENV !== 'production') {
  app.use(cors({
    origin: 'http://localhost:5173',
  }));
}


app.use(express.json());


app.use(rateLimiter); // must come before any of my routes


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/notes', noteRoutes);

if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist"));
  })
}

connectDB().then(() => {
  app.listen(port, () => console.log(`Server is running on port ${port}`));
})
