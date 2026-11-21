
import app from "./server/express.js";
import mongoose from "mongoose";
import config from "./config/config.js";

if (!config.mongoUri) {
  throw new Error("MONGODB_URI environment variable is missing.");
}

if (!config.jwtSecret) {
  throw new Error("JWT_SECRET environment variable is missing.");
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

    app.listen(config.port, "0.0.0.0", () => {
      console.log(`Server started on port ${config.port}.`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error.message);
    process.exit(1);
  }
};

startServer();
