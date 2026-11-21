
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  // Main project information.
  title: {
    type: String,
    required: true,
    trim: true,
  },

  role: {
    type: String,
    trim: true,
  },

  period: {
    type: String,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },

  outcome: {
    type: String,
    trim: true,
  },

  // Identifies which existing local project image to display.
  imageKey: {
    type: String,
    enum: ["database", "linux", "requirements", "web", ""],
    default: "",
  },

  // Legacy fields retained for existing database records.
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
});

export default mongoose.model("Project", projectSchema);
