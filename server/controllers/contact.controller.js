
import Contact from "../models/contact.model.js";
import { createCrudController } from "./crud.controller.js";

const crud = createCrudController(Contact);

// Validate and save a public contact form submission.
const create = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      contactNumber,
      message,
    } = req.body;

    if (
      !firstname ||
      !lastname ||
      !email ||
      !contactNumber ||
      !message
    ) {
      return res.status(400).json({
        error: "All contact form fields are required.",
      });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      return res.status(400).json({
        error: "Please provide a valid email address.",
      });
    }

    const contact = await Contact.create({
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      email: email.trim().toLowerCase(),
      contactNumber: contactNumber.trim(),
      message: message.trim(),
    });

    return res.status(201).json({
      message: "Contact submission saved successfully.",
      contact,
    });
  } catch (error) {
    console.error("Contact submission error:", error.message);

    return res.status(500).json({
      error: "Could not save contact submission.",
    });
  }
};

export default {
  ...crud,
  create,
};
