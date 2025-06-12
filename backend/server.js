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

app.use(helmet());
app.use(cors());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use(express.json());
app.use(mongoSanitize());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));
app.use("/api", applicationRoutes);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  if (
    req.originalUrl.startsWith("/api") ||
    req.originalUrl.startsWith("/uploads")
  ) {
    return res.status(404).end();
  }
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
