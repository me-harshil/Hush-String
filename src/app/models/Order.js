const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    orderId: { type: String, required: true },
    paymentInfo: { type: Object, default: "" },
    products: { type: Object, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "initiated" },
  },
  { timestamps: true }
);

export default mongoose.model.Order || mongoose.model("Order", OrderSchema);
