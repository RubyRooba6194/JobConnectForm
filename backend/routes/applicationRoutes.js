import express from "express";
import multer from "multer";
import path from "path";
import { submitApplication } from "../controllers/applicationController.js";
import {
  applicationValidationRules,
  validateRequest,
} from "../middleware/validate.js";

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// Use validation middlewares in route chain
router.post(
  "/college-application",
  upload.single("resume"),
  applicationValidationRules,
  validateRequest,
  submitApplication
);

export default router;
