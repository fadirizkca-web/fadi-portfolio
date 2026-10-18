import express from "express";
import userCtrl from "../controllers/user.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/api/users", userCtrl.create);

router.get(
  "/api/users",
  authCtrl.requireSignin,
  userCtrl.getAll
);

router.delete(
  "/api/users",
  authCtrl.requireSignin,
  userCtrl.deleteAll
);

router.get(
  "/api/users/:id",
  authCtrl.requireSignin,
  userCtrl.getById
);

router.put(
  "/api/users/:id",
  authCtrl.requireSignin,
  userCtrl.update
);

router.delete(
  "/api/users/:id",
  authCtrl.requireSignin,
  userCtrl.deleteById
);

export default router;