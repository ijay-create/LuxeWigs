import express from "express";
import {
  createOrder,
  getOrders,
  updateOrder
} from "../controllers/orderController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", protect, adminOnly, getOrders);
router.put("/:id", protect, adminOnly, updateOrder);

export default router;


