
import express from "express";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// Sign in.
router.post("/api/auth/signin", authCtrl.signin);

// Sign out.
// GET is included to match the Assignment 3 requirements.
router.get("/api/auth/signout", authCtrl.signout);

// POST is also supported for compatibility.
router.post("/api/auth/signout", authCtrl.signout);

export default router;
