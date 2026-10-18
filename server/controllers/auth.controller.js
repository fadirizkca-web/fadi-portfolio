
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import config from "../../config/config.js";

// Check that the JWT secret is available before creating the middleware.
if (!config.jwtSecret) {
  throw new Error(
    "JWT_SECRET is missing. Check the .env file in the project root."
  );
}

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required.",
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }

    const passwordMatches = await user.comparePassword(password);

    if (!passwordMatches) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      { _id: user._id.toString() },
      config.jwtSecret,
      { expiresIn: "1h", algorithm: "HS256" }
    );

    res.cookie("t", token, {
      httpOnly: true,
      secure: config.env === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Sign-in error:", error.message);

    return res.status(500).json({
      error: "Could not sign in.",
    });
  }
};

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

const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  getToken: (req) => {
    // Prefer the Authorization Bearer token when provided.
    const authorization = req.headers.authorization;

    if (authorization?.startsWith("Bearer ")) {
      return authorization.split(" ")[1];
    }

    // Otherwise, use the HTTP-only cookie.
    return req.cookies?.t;
  },
});

export default {
  signin,
  signout,
  requireSignin,
};
