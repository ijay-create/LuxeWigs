import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/verify/:reference", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${req.params.reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Verification failed" });
  }
});

export default router;