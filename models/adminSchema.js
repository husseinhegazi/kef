const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: string,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    default: "adminKeef@keef.com",
    unique: true,
    required: true,
    minlength: 10,
    maxlength: 40,
    lowercase: true,
    trim: true,
  },
  password: {
    type: string,
    default: "Admin@123",
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
    type: string,
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
