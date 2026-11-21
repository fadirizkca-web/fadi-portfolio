
import mongoose from "mongoose";
import config from "../config/config.js";
import User from "../server/models/user.model.js";

// Read Admin credentials from the private .env file.
const adminName = process.env.ADMIN_NAME;
const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const adminPassword = process.env.ADMIN_PASSWORD;

const createAdmin = async () => {
  try {
    // Check required configuration.
    if (!config.mongoUri) {
      throw new Error("MONGODB_URI is missing.");
    }

    if (!adminName || !adminEmail || !adminPassword) {
      throw new Error("Admin environment variables are missing.");
    }

    if (adminPassword.length < 12) {
      throw new Error("Admin password must contain at least 12 characters.");
    }

    // Connect to the Portfolio database.
    await mongoose.connect(config.mongoUri, {
      dbName: "Portfolio",
    });

    console.log("Connected to MongoDB.");

    // Check whether this Admin account already exists.
    let admin = await User.findOne({ email: adminEmail });

    if (admin) {
      // Promote the existing account without changing its password.
      admin.role = "admin";
      await admin.save();

      console.log("Existing account promoted to Admin.");
    } else {
      // Create a new Admin account.
      // The User model automatically hashes the password.
      admin = await User.create({
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        role: "admin",
      });

      console.log("Admin account created successfully.");
    }

    console.log("Admin email:", admin.email);
    console.log("Admin role:", admin.role);
  } catch (error) {
    console.error("Admin initialization failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB connection closed.");
  }
};

createAdmin();
