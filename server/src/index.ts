import cors from "cors";
import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute";

import formRoutes from './routes/formRoutes';

dotenv.config();

// const app: Application = express();
const PORT: number = Number(process.env.PORT) || 8000;

//

const app = express();
const cookieParser = require("cookie-parser");
mongoose.set("debug", true);

require('dotenv').config();


const port = process.env.PORT || 8000;

// Use middleware
app.use(express.json());
app.use(cookieParser());


// CORS configuration
app.use(
    cors({
        origin: process.env.ORIGIN || 'http://localhost:3000',
        credentials: true,
    })
);


//
// Middleware
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/forms', formRoutes);

// MongoDB connection URI
// const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@forms-app.nwxnlgi.mongodb.net/?retryWrites=true&w=majority&appName=forms-app`

const dbUrl = "mongodb+srv://formsAppServer:05jx80NNrcTScUrJ@forms-app.nwxnlgi.mongodb.net/?retryWrites=true&w=majority&appName=forms-app"

// MongoDB client setup
const connectDB = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(dbUrl);
    console.log(`Database connected successfully: ${connection.connection.host}`);
  } catch (error) {
    console.error("Database connection error:", (error as Error).message);
    setTimeout(connectDB, 5000); // Retry connection after 5 seconds
  }
};

connectDB();

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("froms app server is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
