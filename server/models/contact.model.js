
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },

  lastname: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },

  // Additional information submitted through the contact form.
  contactNumber: {
    type: String,
    trim: true,
  },

  message: {
    type: String,
    trim: true,
    maxlength: 2000,
  },

  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Contact", contactSchema);
