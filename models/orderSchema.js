const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const orderSchema = new mongoose.Schema({
  _id: { type: Number },
  user: { type: Number, required: true },
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  buildingNumber: {
    type: String,
    required: true,
  },
  floor: { type: Number, required: true },
  apartment: { type: String },
  notes: { type: String },
  products: [{ type: Number, ref: "products", required: true }],
  productInfo: { type: Number, ref: "productInfo", required: true },
  size: { type: String, enum: ["medium", "large", "xlarge"], required: true },
  totalPrice: { type: Number, required: true },
});
orderSchema.plugin(AutoIncrement, { id: "orderCounter" });

module.exports = mongoose.model("order", orderSchema);
