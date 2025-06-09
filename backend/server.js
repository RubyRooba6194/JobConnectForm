import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middlewares
app.use(helmet());
app.use(cors());

// Rate limiter - limit requests to prevent abuse
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // max 100 requests per windowMs
});
app.use(limiter);

// Body parser - parse JSON bodies for application/json requests
app.use(express.json());

// Mongo sanitize (body only, compatible with Express 5+)
app.use((req, res, next) => {
  if (req.body) mongoSanitize.sanitize(req.body, { replaceWith: "_" });
  next();
});

// Directory helpers
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploads (for resumes)
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));

// API routes
app.use("/api", applicationRoutes);

// Serve frontend build
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// For any route not starting with /api or /uploads, serve index.html
app.get("*", (req, res) => {
  if (
    req.originalUrl.startsWith("/api") ||
    req.originalUrl.startsWith("/uploads")
  ) {
    return res.status(404).end();
  }
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// Connect to DB and start server
connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
