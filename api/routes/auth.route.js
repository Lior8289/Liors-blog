import express from "express";
import { signup } from "../controllers/auth.controller.js";
import { test } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.get("/test", test);

export default router;
