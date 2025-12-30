import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import userEmailRoutes from "./routes/userEmailRoutes.js";

// Load environment variables

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/users", userEmailRoutes);

// Test route
app.get("/", (req, res)=>{
    res.json({
        message: "API is running...",
    });
});

// Start server
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
