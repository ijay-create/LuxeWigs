import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: String,
    description: String
  },
  { timestamps: true }
);

// 🔥 TEXT INDEX (IMPORTANT FOR SEARCH)
productSchema.index({
  name: "text",
  category: "text",
  description: "text"
});

export default mongoose.model("Product", productSchema);

