import express from "express";
import upload from "../middlewares/upload.js";
import {
  submitApplication,
  getAllApplications,
} from "../controllers/applicationController.js";

const router = express.Router();

// POST /api/college-application
router.post("/college-application", upload.single("resume"), submitApplication);
// Add this route
router.get("/applications", getAllApplications);

export default router;
