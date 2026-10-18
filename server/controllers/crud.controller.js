export const createCrudController = (Model) => ({
  getAll: async (req, res) => {
    try {
      const records = await Model.find();
      return res.status(200).json(records);
    } catch (error) {
      return res.status(500).json({ error: "Could not retrieve records." });
    }
  },

  getById: async (req, res) => {
    try {
      const record = await Model.findById(req.params.id);

      if (!record) {
        return res.status(404).json({ error: "Record not found." });
      }

      return res.status(200).json(record);
    } catch (error) {
      return res.status(400).json({ error: "Invalid record ID." });
    }
  },

  create: async (req, res) => {
    try {
      const record = await Model.create(req.body);
      return res.status(201).json(record);
    } catch (error) {
      return res.status(400).json({
        error: "Could not create record.",
        details: error.message,
      });
    }
  },

  update: async (req, res) => {
    try {
      const record = await Model.findByIdAndUpdate(
        req.params.id,
        { ...req.body, updated: new Date() },
        { new: true, runValidators: true }
      );

      if (!record) {
        return res.status(404).json({ error: "Record not found." });
      }

      return res.status(200).json(record);
    } catch (error) {
      return res.status(400).json({
        error: "Could not update record.",
        details: error.message,
      });
    }
  },

  deleteById: async (req, res) => {
    try {
      const record = await Model.findByIdAndDelete(req.params.id);

      if (!record) {
        return res.status(404).json({ error: "Record not found." });
      }

      return res.status(200).json({ message: "Record deleted." });
    } catch (error) {
      return res.status(400).json({ error: "Invalid record ID." });
    }
  },

  deleteAll: async (req, res) => {
    try {
      const result = await Model.deleteMany({});
      return res.status(200).json({
        message: "All records deleted.",
        deletedCount: result.deletedCount,
      });
    } catch (error) {
      return res.status(500).json({ error: "Could not delete records." });
    }
  },
});