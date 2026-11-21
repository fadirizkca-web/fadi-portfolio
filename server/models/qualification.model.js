
import mongoose from "mongoose";

const qualificationSchema = new mongoose.Schema({
  // Education or professional qualification.
  qualification: {
    type: String,
    required: true,
    trim: true,
  },

  institution: {
    type: String,
    required: true,
    trim: true,
  },

  period: {
    type: String,
    required: true,
    trim: true,
  },

  details: {
    type: String,
    required: true,
    trim: true,
  },

  category: {
    type: String,
    enum: ["education", "professional-development"],
    default: "education",
  },

  // Legacy fields retained for compatibility with older records.
  title: {
    type: String,
    trim: true,
  },

  firstname: {
    type: String,
    trim: true,
  },

  lastname: {
    type: String,
    trim: true,
  },

  email: {
    type: String,
    trim: true,
    lowercase: true,
  },

  completion: {
    type: Date,
  },

  description: {
    type: String,
    trim: true,
  },
});

export default mongoose.model("Qualification", qualificationSchema);
