import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
// ROUTES
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paystackRoutes from "./routes/paystackRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

// CONNECT DB
connectDB();

const app = express();

// MIDDLEWARE
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/paystack", paystackRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use(cors({
  origin: "https://your-frontend.vercel.app",
  credentials: true
}));

app.use((err, req, res, next) => {
  console.log(err);

  res.status(500).json({
    message: "Server Error"
  });
});

// HEALTH CHECK
app.get("/", (req, res) => {
  res.send("Luxe Wigs API is running 🚀");
});

// START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});