import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import { connectDb } from './utils/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);

const port = process.env.PORT || 5002;

connectDb().then(() => {
  app.listen(port, () => {
    console.log(
      `Welcome Mr kartik barman\nYour server running at port http://localhost:${port}`
    );
  });
});

