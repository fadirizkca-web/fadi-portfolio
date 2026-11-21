
import express from "express";
import qualificationCtrl from "../controllers/qualification.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// Public: view qualifications.
router.route("/api/qualifications")
  .get(qualificationCtrl.getAll);

// Admin only: create or delete all qualifications.
router.route("/api/qualifications")
  .post(
    authCtrl.requireSignin,
    authCtrl.requireAdmin,
    qualificationCtrl.create
  )
  .delete(
    authCtrl.requireSignin,
    authCtrl.requireAdmin,
    qualificationCtrl.deleteAll
  );

// Public: view one qualification.
router.route("/api/qualifications/:id")
  .get(qualificationCtrl.getById);

// Admin only: update or delete one qualification.
router.route("/api/qualifications/:id")
  .put(
    authCtrl.requireSignin,
    authCtrl.requireAdmin,
    qualificationCtrl.update
  )
  .delete(
    authCtrl.requireSignin,
    authCtrl.requireAdmin,
    qualificationCtrl.deleteById
  );

export default router;
