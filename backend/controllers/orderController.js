import Order from "../models/Order.js";
import { sendOrderEmail } from "../utils/sendEmail.js";

// CREATE ORDER
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

    const order = await Order.create({
      userEmail,
      customerName,
      phone,
      items,
      totalAmount,
      reference,
      status: "paid"
    });

    try {
      await sendOrderEmail({
        email: userEmail,
        name: customerName,
        order
      });
    } catch (err) {
      console.log("Email failed:", err.message);
    }

    res.status(201).json(order);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Order failed" });
  }
};

// GET ORDERS (THIS IS WHAT IS MISSING OR BROKEN)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// UPDATE ORDER
export const updateOrder = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to update order" });
  }
};