const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    website: { type: String },
    logo: { type: String },
    superAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    created_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Organization", OrganizationSchema);
