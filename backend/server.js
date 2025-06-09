import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middlewares
app.use(helmet());
app.use(cors());
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

// Body parser - parse JSON bodies for application/json requests
app.use(express.json());

// Rate limiter - limit requests to prevent abuse
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // max 100 requests per windowMs
});
app.use(limiter);

// Static folder to serve uploaded resume files
app.use("/uploads", express.static(path.resolve("uploads")));

// Routes - mount your application routes under /api/applications
app.use("/api/applications", applicationRoutes);

// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
