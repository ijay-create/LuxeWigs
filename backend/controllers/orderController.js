import Order from "../models/Order.js";
import { sendOrderEmail } from "../utils/sendEmail.js";

/* =========================
   CREATE ORDER (FIXED)
========================= */
export const createOrder = async (req, res) => {
  try {
    const {
      userEmail,
      customerName,
      phone,
      items,
      totalAmount,
      reference
    } = req.body;

    // 🔥 STEP 1: VALIDATION (CRITICAL FIX)
    if (
      !userEmail ||
      !customerName ||
      !phone ||
      !Array.isArray(items) ||
      items.length === 0 ||
      !totalAmount ||
      !reference
    ) {
      return res.status(400).json({
        message: "Invalid order payload"
      });
    }

    // 🔥 STEP 2: CLEAN ITEMS (MOBILE SAFE)
    const safeItems = items.map((item) => ({
      id: item.id || item._id || "unknown",
      name: item.name || "Item",
      price: Number(item.price) || 0,
      quantity: Number(item.quantity) || 1
    }));

    // 🔥 STEP 3: CREATE ORDER
    const order = await Order.create({
      userEmail,
      customerName,
      phone,
      items: safeItems,
      totalAmount: Number(totalAmount),
      reference,
      status: "paid"
    });

    // 🔥 STEP 4: EMAIL (NON-BLOCKING)
    sendOrderEmail({
      email: userEmail,
      name: customerName,
      order
      }).catch((err) => {
      console.log("Email failed (non-critical):", err.message);
    });

    return res.status(201).json({
      success: true,
      order
    });

  } catch (error) {
    console.error("🔥 ORDER CREATE ERROR:", error);

    return res.status(500).json({
      message: "Order failed",
      error: error.message
    });
  }
};

/* =========================
   GET ORDERS
========================= */
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("GET ORDERS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

/* =========================
   UPDATE ORDER
========================= */
export const updateOrder = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("UPDATE ORDER ERROR:", error);
    res.status(500).json({ message: "Failed to update order" });
  }
};