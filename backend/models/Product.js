import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    price: {
      type: Number,
      required: true
    },

    image: {
      type: String,
      required: true
    },

    category: {
      type: String,
      default: "Luxury Wig"
    },

    description: {
      type: String,
      default: ""
    },

    // ✅ FIX ADDED
    stock: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

/* =========================
   🔍 SEARCH INDEX
========================= */
productSchema.index({
  name: "text",
  category: "text",
  description: "text"
});

export default mongoose.model("Product", productSchema);