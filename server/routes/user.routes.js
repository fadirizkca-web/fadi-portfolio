
import express from "express";
import userCtrl from "../controllers/user.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// Public: new users can register.
router.post("/api/users", userCtrl.create);

// Admin only: view all registered users.
router.get(
  "/api/users",
  authCtrl.requireSignin,
  authCtrl.requireAdmin,
  userCtrl.getAll
);

// Admin only: view one user.
router.get(
  "/api/users/:id",
  authCtrl.requireSignin,
  authCtrl.requireAdmin,
  userCtrl.getById
);

// Admin only: update a user.
router.put(
  "/api/users/:id",
  authCtrl.requireSignin,
  authCtrl.requireAdmin,
  userCtrl.update
);

// Admin only: delete one user.
router.delete(
  "/api/users/:id",
  authCtrl.requireSignin,
  authCtrl.requireAdmin,
  userCtrl.deleteById
);

// Admin only: delete all users.
router.delete(
  "/api/users",
  authCtrl.requireSignin,
  authCtrl.requireAdmin,
  userCtrl.deleteAll
);

export default router;
