import express from "express";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts
} from "../controllers/productController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";
import Product from "../models/Product.js";

const router = express.Router();

/* =========================
   PUBLIC ROUTES
========================= */

// Get all products
router.get("/", getProducts);

// Search products
router.get("/search", searchProducts);

// Get single product (for product details page)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.json({
      success: true,
      product
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching product"
    });
  }
});

/* =========================
   ADMIN ROUTES (SECURE)
========================= */

// Create product
router.post("/", protect, adminOnly, createProduct);

// Update product
router.put("/:id", protect, adminOnly, updateProduct);

// Delete product
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;