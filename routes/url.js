import express from "express";
const router = express.Router();
import { handleGenerateNewShortUrl } from "../controller/url.controller.js";
router.post("/", handleGenerateNewShortUrl);

export default router;
