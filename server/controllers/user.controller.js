import User from "../models/user.model.js";
import { createCrudController } from "./crud.controller.js";

const crud = createCrudController(User);

const getAll = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Could not retrieve users." });
  }
};

const getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: "Invalid user ID." });
  }
};

const create = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      created: user.created,
      updated: user.updated,
    });
  } catch (error) {
    return res.status(400).json({
      error: "Could not create user.",
      details: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const allowedUpdates = {};

    for (const field of ["name", "email"]) {
      if (req.body[field] !== undefined) {
        allowedUpdates[field] = req.body[field];
      }
    }

    if (req.body.password) {
      const bcrypt = await import("bcryptjs");
      allowedUpdates.password = await bcrypt.default.hash(
        req.body.password,
        12
      );
    }

    allowedUpdates.updated = new Date();

    const user = await User.findByIdAndUpdate(
      req.params.id,
      allowedUpdates,
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      error: "Could not update user.",
      details: error.message,
    });
  }
};

export default {
  ...crud,
  getAll,
  getById,
  create,
  update,
};