const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, default: "" },
    role: {
      type: String,
      enum: [
        "Admin",
        "Super Admin",
        "Project Manager",
        "Developer",
        "Team Member",
        "User",
      ],
      default: "User",
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      default: null,
    },
    isPremium: { type: Boolean, default: false },
    profileImage: { type: String, default: "" },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
    chatGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: "ChatGroup" }],
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    created_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
