import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },

    items: [
      {
        id: String,
        name: String,
        price: String,
        image: String
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Wishlist", wishlistSchema);