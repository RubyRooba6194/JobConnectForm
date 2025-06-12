import express from "express";
import upload from "../middlewares/upload.js";
import {
  submitApplication,
  getAllApplications,
} from "../controllers/applicationController.js";

const router = express.Router();

router.post("/job-application", upload.single("resume"), submitApplication);
router.get("/applications", getAllApplications);

export default router;
