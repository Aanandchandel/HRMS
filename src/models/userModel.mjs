import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, "Invalid email format"],
  },
  password: {
    type: String,
    required: true,
  },
  img_path: {
    type: String,
    default: null,
  },
  is_valid: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const User = mongoose.model("User", userSchema);
export default User;
