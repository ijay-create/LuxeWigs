import express from "express";
import {
  createOrder,
  getOrders,
  updateOrder
} from "../controllers/orderController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================
   CREATE ORDER (SAFE FIX)
========================= */
router.post("/", async (req, res, next) => {
  try {
    // basic validation to prevent mobile crashes
    if (!req.body || !req.body.items || !req.body.reference) {
      return res.status(400).json({
        message: "Invalid order payload"
      });
    }

    return await createOrder(req, res, next);
  } catch (err) {
    console.error("ORDER ROUTE ERROR:", err);
    return res.status(500).json({
      message: "Order creation failed"
    });
  }
});

/* =========================
   ADMIN ROUTES (UNCHANGED)
========================= */
router.get("/", protect, adminOnly, getOrders);
router.put("/:id", protect, adminOnly, updateOrder);

export default router;