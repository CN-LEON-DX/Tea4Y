
const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    deleted: { type: Boolean, default: false },
    permissions: { type: Array, default: [] },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Roles  = mongoose.model("Roles", roleSchema, "roles");
module.exports = Roles;
