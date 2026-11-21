import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import compression from "compression";

import contactRoutes from "./routes/contact.routes.js";
import projectRoutes from "./routes/project.routes.js";
import qualificationRoutes from "./routes/qualification.routes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(helmet());
const allowedOrigins = [
  "http://localhost:5173",
  "https://fadi-portfolio-one.vercel.app",
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

app.use("/", contactRoutes);
app.use("/", projectRoutes);
app.use("/", qualificationRoutes);
app.use("/", userRoutes);
app.use("/", authRoutes);

app.use((err, req, res, next) => {
  console.error(err);

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      error: "Authentication required",
    });
  }

  return res.status(500).json({
    error: "An unexpected server error occurred.",
  });
});

export default app;