import dotenv from 'dotenv';
import express from 'express';

import { connectDB } from './config/db.js';
import {
  swaggerSpec,
  swaggerUi,
} from './config/swagger.js';
import noteRoutes from './routes/noteRoutes.js';

const app = express();

dotenv.config();
connectDB();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/notes', noteRoutes);


app.listen(port, () => console.log(`Server is running on port ${port}`));
