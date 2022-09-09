const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

//user schema
const userSchema = new mongoose.Schema({
  _id: { type: Number },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    lowercase: true,
    maxlength: 50,
    trim: true,
  },
  phoneNumber: { type: Number, required: true, length: 10, unique: true,trim: true },
  password: { type: String, required: true, minlength: 8 },
  orders: [{ type: Number, ref: "orders", required: true, default: [] }],
  //   basket: [{ type: Number, ref: "orders", required: true, default: [] }],
  role: "user",
});
// auto increment id plugin
userSchema.plugin(AutoIncrement, { id: "userCounter" });
//mapping
module.exports = mongoose.model("users", userSchema);
