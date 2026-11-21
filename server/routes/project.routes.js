
import express from "express";
import projectCtrl from "../controllers/project.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// Public: visitors and users can view projects.
router.route("/api/projects")
  .get(projectCtrl.getAll);

// Admin only: create or delete all projects.
router.route("/api/projects")
  .post(
    authCtrl.requireSignin,
    authCtrl.requireAdmin,
    projectCtrl.create
  )
  .delete(
    authCtrl.requireSignin,
    authCtrl.requireAdmin,
    projectCtrl.deleteAll
  );

// Public: view an individual project.
router.route("/api/projects/:id")
  .get(projectCtrl.getById);

// Admin only: update or delete an individual project.
router.route("/api/projects/:id")
  .put(
    authCtrl.requireSignin,
    authCtrl.requireAdmin,
    projectCtrl.update
  )
  .delete(
    authCtrl.requireSignin,
    authCtrl.requireAdmin,
    projectCtrl.deleteById
  );

export default router;
