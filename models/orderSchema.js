const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

//address schema:
const productSizeSchema = new mongoose.Schema({
  productInfoId: { type: Number, ref: "productInfo", required: true },
  size: {
    type: String,
    enum: ["medium", "large", "xlarge"],
    required: true,
  },
});

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
  productInfo: [{ type: productSizeSchema, _id: false }],
  totalPrice: { type: Number, required: true },
  orderStatus: {
    type: String,
    enum: ["pending", "rejected", "accepted", "on the way", "delivered"],
    default: "pending",
  },
});
orderSchema.plugin(AutoIncrement, { id: "orderCounter" });

module.exports = mongoose.model("order", orderSchema);
