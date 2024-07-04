import express from "express";
import { handleUserSignup } from "../controller/user.controller.js";

const router = express.Router();
router.post("/", handleUserSignup);
export default router;
