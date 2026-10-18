import express from "express";
import qualificationCtrl from "../controllers/qualification.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/api/qualifications")
  .get(qualificationCtrl.getAll)
  .post(authCtrl.requireSignin, qualificationCtrl.create)
  .delete(authCtrl.requireSignin, qualificationCtrl.deleteAll);

router.route("/api/qualifications/:id")
  .get(qualificationCtrl.getById)
  .put(authCtrl.requireSignin, qualificationCtrl.update)
  .delete(authCtrl.requireSignin, qualificationCtrl.deleteById);

export default router;