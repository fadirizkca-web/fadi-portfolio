import express from "express";
import contactCtrl from "../controllers/contact.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/api/contacts")
  .get(contactCtrl.getAll)
  .post(authCtrl.requireSignin, contactCtrl.create)
  .delete(authCtrl.requireSignin, contactCtrl.deleteAll);

router.route("/api/contacts/:id")
  .get(contactCtrl.getById)
  .put(authCtrl.requireSignin, contactCtrl.update)
  .delete(authCtrl.requireSignin, contactCtrl.deleteById);

export default router;