import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userEmail: String,
  items: Array,
  totalAmount: Number,
  reference: String,
  status: {
    type: String,
    default: "pending"
  }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);