import express from "express";

const router = express.Router();

let wishlist = [];

router.get("/", (req, res) => {
  res.json({ items: wishlist });
});

router.post("/add", (req, res) => {
  wishlist.push(req.body);
  res.json({ items: wishlist });
});

router.post("/remove", (req, res) => {
  const { id } = req.body;
  wishlist = wishlist.filter(item => item.id !== id);
  res.json({ items: wishlist });
});

export default router;