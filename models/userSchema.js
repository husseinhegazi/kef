const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

//user schema
const userSchema = new mongoose.Schema({
  _id: { type: Number },
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 30,
  },
  lastName: { type: String, required: true, minLength: 2, maxLength: 30 },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    lowercase: true,
    maxLength: 40,
    trim: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    length: 10,
    unique: true,
    trim: true,
  },
  password: { type: String, required: true },
  orders: [{ type: Number, ref: "orders", required: true, default: [] }],
  role: "user",
});
// auto increment id plugin
userSchema.plugin(AutoIncrement, { id: "userCounter" });
//mapping
module.exports = mongoose.model("users", userSchema);
