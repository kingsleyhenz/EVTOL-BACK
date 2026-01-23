import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from './config/dbConnect.ts';
import mainRouter from "./routes/index.ts";
import { errorHandler, notFound } from "./middleware/errorHandler.ts";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content', 'Accept', 'Content-Type', 'Authorization']
}));

app.options('*', cors());

// Routes
app.use("/api/v1", mainRouter);

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
  });
}

export default app;
