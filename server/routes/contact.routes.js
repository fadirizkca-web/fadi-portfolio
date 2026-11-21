
import express from "express";
import contactCtrl from "../controllers/contact.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// Public: visitors can submit contact forms.
router.post("/api/contacts", contactCtrl.create);

// Admin only: view all contact submissions.
router.get(
  "/api/contacts",
  authCtrl.requireSignin,
  authCtrl.requireAdmin,
  contactCtrl.getAll
);

// Admin only: delete all contacts.
router.delete(
  "/api/contacts",
  authCtrl.requireSignin,
  authCtrl.requireAdmin,
  contactCtrl.deleteAll
);

// Admin only: view one contact.
router.get(
  "/api/contacts/:id",
  authCtrl.requireSignin,
  authCtrl.requireAdmin,
  contactCtrl.getById
);

// Admin only: update or delete one contact.
router.route("/api/contacts/:id")
  .put(
    authCtrl.requireSignin,
    authCtrl.requireAdmin,
    contactCtrl.update
  )
  .delete(
    authCtrl.requireSignin,
    authCtrl.requireAdmin,
    contactCtrl.deleteById
  );

export default router;
