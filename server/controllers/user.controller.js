
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createCrudController } from "./crud.controller.js";

const crud = createCrudController(User);

// Retrieve all users without exposing password hashes.
const getAll = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    return res.status(200).json(users);
  } catch (error) {
    console.error("Get users error:", error.message);

    return res.status(500).json({
      error: "Could not retrieve users.",
    });
  }
};

// Retrieve one user without exposing the password.
const getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      error: "Invalid user ID.",
    });
  }
};

// Register a new regular user.
const create = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Name, email and password are required.",
      });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      return res.status(400).json({
        error: "Please provide a valid email address.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must contain at least 6 characters.",
      });
    }

    const existingUser = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (existingUser) {
      return res.status(409).json({
        error: "This email is already registered.",
      });
    }

    // Never accept the role from the registration request.
    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    });

    return res.status(201).json({
      message: "User registered successfully.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        created: user.created,
      },
    });
  } catch (error) {
    console.error("Registration error:", error.message);

    if (error.code === 11000) {
      return res.status(409).json({
        error: "This email is already registered.",
      });
    }

    return res.status(500).json({
      error: "Could not register user.",
    });
  }
};

// Admin: update a user's information and role.
const update = async (req, res) => {
  try {
    const userId = req.params.id;

    // Prevent an Admin from changing their own role.
    if (
      req.auth._id === userId &&
      req.body.role !== undefined
    ) {
      return res.status(403).json({
        error: "You cannot change your own account role.",
      });
    }

    const allowedUpdates = {};

    // Update the user's name.
    if (req.body.name !== undefined) {
      if (!req.body.name.trim()) {
        return res.status(400).json({
          error: "Name cannot be empty.",
        });
      }

      allowedUpdates.name = req.body.name.trim();
    }

    // Update the user's email.
    if (req.body.email !== undefined) {
      const email = req.body.email.trim().toLowerCase();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        return res.status(400).json({
          error: "Please provide a valid email address.",
        });
      }

      const existingUser = await User.findOne({
        email,
        _id: { $ne: userId },
      });

      if (existingUser) {
        return res.status(409).json({
          error: "This email is already registered.",
        });
      }

      allowedUpdates.email = email;
    }

    // Only allow the Admin to assign valid roles.
    if (req.body.role !== undefined) {
      if (!["user", "admin"].includes(req.body.role)) {
        return res.status(400).json({
          error: "Role must be either user or admin.",
        });
      }

      allowedUpdates.role = req.body.role;
    }

    // Hash a new password before saving it.
    if (req.body.password !== undefined) {
      if (req.body.password.length < 6) {
        return res.status(400).json({
          error: "Password must contain at least 6 characters.",
        });
      }

      allowedUpdates.password = await bcrypt.hash(
        req.body.password,
        12
      );
    }

    if (Object.keys(allowedUpdates).length === 0) {
      return res.status(400).json({
        error: "No valid user information was provided.",
      });
    }

    allowedUpdates.updated = new Date();

    const user = await User.findByIdAndUpdate(
      userId,
      allowedUpdates,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    return res.status(200).json({
      message: "User updated successfully.",
      user,
    });
  } catch (error) {
    console.error("Update user error:", error.message);

    if (error.code === 11000) {
      return res.status(409).json({
        error: "This email is already registered.",
      });
    }

    return res.status(400).json({
      error: "Could not update user.",
    });
  }
};

// Admin: delete one user.
const deleteById = async (req, res) => {
  try {
    // Prevent an Admin from deleting their own account.
    if (req.auth._id === req.params.id) {
      return res.status(403).json({
        error: "You cannot delete your own account.",
      });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    return res.status(200).json({
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.error("Delete user error:", error.message);

    return res.status(400).json({
      error: "Could not delete user.",
    });
  }
};

export default {
  ...crud,
  getAll,
  getById,
  create,
  update,
  deleteById,
};
