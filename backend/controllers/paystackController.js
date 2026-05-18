import axios from "axios";

export const verifyPayment = async (req, res) => {

  const { reference } = req.params;

  try {

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
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
};