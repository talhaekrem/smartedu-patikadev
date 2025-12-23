const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    deletedFlag: { type: String, default: "N" },
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },
  },
  { timestamps: { createdAt: "createDate", updatedAt: "modifyDate" } }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
