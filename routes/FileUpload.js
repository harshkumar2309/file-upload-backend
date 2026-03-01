import express from "express"
import { localFileUpload, imageUpload } from "../controllers/fileUpload.js";

export const router = express.Router();

// api routes
router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
