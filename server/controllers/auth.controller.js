
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import config from "../../config/config.js";

// Ensure that the JWT secret is configured.
if (!config.jwtSecret) {
  throw new Error("JWT_SECRET is missing from the .env file.");
}

// Sign in an existing user.
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required.",
      });
    }

    // Find the user using the normalized email address.
    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }

    // Compare the entered password with the stored bcrypt hash.
    const passwordMatches = await user.comparePassword(password);

    if (!passwordMatches) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }

    // Generate a JWT containing the user's ID and role.
    const token = jwt.sign(
      {
        _id: user._id.toString(),
        role: user.role,
      },
      config.jwtSecret,
      {
        expiresIn: "1h",
        algorithm: "HS256",
      }
    );

    // Store the token in an HTTP-only cookie.
    res.cookie("t", token, {
      httpOnly: true,
      secure: config.env === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Signed in successfully.",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Sign-in error:", error.message);

    return res.status(500).json({
      error: "Could not sign in.",
    });
  }
};

// Sign out by clearing the authentication cookie.
const signout = (req, res) => {
  res.clearCookie("t", {
    httpOnly: true,
    secure: config.env === "production",
    sameSite: "lax",
  });

  return res.status(200).json({
    message: "Signed out successfully.",
  });
};

// Require a valid JWT for protected routes.
const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],

  getToken: (req) => {
    // First check for an Authorization Bearer token.
    const authorization = req.headers.authorization;

    if (authorization?.startsWith("Bearer ")) {
      return authorization.split(" ")[1];
    }

    // Otherwise, check the HTTP-only cookie.
    return req.cookies?.t;
  },
});

// Verify that the authenticated account is an Admin.
const requireAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.auth._id).select("_id role");

    if (!user) {
      return res.status(401).json({
        error: "User account not found.",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        error: "Admin access required.",
      });
    }

    // Use the current database role, not just the JWT role.
    req.auth.role = user.role;

    next();
  } catch (error) {
    console.error("Authorization error:", error.message);

    return res.status(500).json({
      error: "Could not verify user permissions.",
    });
  }
};

export default {
  signin,
  signout,
  requireSignin,
  requireAdmin,
};
