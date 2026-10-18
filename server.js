import app from "./server/express.js";
import mongoose from "mongoose";
import config from "./config/config.js";

if (!config.mongoUri) {
  throw new Error("MONGODB_URI is missing from the .env file.");
}

if (!config.jwtSecret) {
  throw new Error("JWT_SECRET is missing from the .env file.");
}

const startServer = async () => {
  try {
    await mongoose.connect(config.mongoUri, {
      dbName: "Portfolio",
    });

    console.log("Connected to the database!");

    app.get("/", (req, res) => {
      res.json({
        message: "Welcome to My Portfolio application.",
      });
    });

    app.listen(config.port, () => {
      console.log(`Server started on port ${config.port}.`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error.message);
    process.exit(1);
  }
};

startServer();