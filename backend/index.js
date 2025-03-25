// Packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; // Import cors package

// Utils
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import garbageRoutes from "./routes/garbageRoutes.js"; // fixed typo in garbageRoutes
import inquiryRoutes from "./routes/inquiryRoutes.js";
import truckRoutes from "./routes/truckRoutes.js"; // Import truckRoutes
import scheduleRoutes from "./routes/scheduleRoutes.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

// Enable CORS

app.use(
  cors({
    // origin: "http://192.168.143.146:5173", // or "*" for all origins
    origin: "http://localhost:5173", // or "*" for all origins
    credentials: true, // Allow credentials (cookies) to be included
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Conn Testing
app.get("/api", (req, res) => {
  res.send("Hello GarboMate");
});

// Users Route
app.use("/api/users", userRoutes);

// Garbage Route
app.use("/api/garbage", garbageRoutes);

// Inquiry Route
app.use("/api/inquiries", inquiryRoutes);

// Truck Route
app.use("/api/truck", truckRoutes);

// Schedule Route
app.use("/api/schedule", scheduleRoutes);

app.listen(port, () => console.log(`Server running on port: ${port}`));
