import express from "express";
import upload from "../config/multerConfig.js";
import { signUp } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/signup", upload.single("resume"), signUp);

export default router;
