const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 30,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    trim: true,
  },
  email: {
    type: String,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    // default: "adminKeef@keef.com",
    set: () => {
      "adminKeef@keef.com";
    },
    unique: true,
    required: true,
    maxlength: 40,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    // default: "Admin@123",
    set: () => {
      "Admin@123";
    },
    required: true,
  },
  phoneNumber: {
    type: Number,
    unique: true,
    required: true,
    length: 10,
    trim: true,
  },
  wallet: {
    type: Number,
  },
  role: {
    type: String,
    default: "admin",
  },
  nationalId: {
    type: Number,
    length: 14,
    unique: true,
    required: true,
    trim: true,
  },
});
module.exports = mongoose.model("admin", adminSchema);
