import express from "express"
import { localFileUpload } from '../controllers/fileUpload.js';

export const router = express.Router();

// api routes
router.post("/localFileUpload", localFileUpload);
