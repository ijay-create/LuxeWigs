import Wishlist from "../models/Wishlist.js";

// GET WISHLIST
export const getWishlist = async (req, res) => {

  const wishlist = await Wishlist.findOne({
    userId: req.user.id
  });

  res.json(wishlist || { items: [] });

};

// ADD ITEM
export const addToWishlist = async (req, res) => {

  let wishlist = await Wishlist.findOne({
    userId: req.user.id
  });

  if (!wishlist) {
    wishlist = new Wishlist({
      userId: req.user.id,
      items: []
    });
  }

  const exists = wishlist.items.find(
    item => item.id === req.body.id
  );

  if (!exists) {
    wishlist.items.push(req.body);
  }

  await wishlist.save();

  res.json(wishlist);

};

// REMOVE ITEM
export const removeFromWishlist = async (req, res) => {

  const wishlist = await Wishlist.findOne({
    userId: req.user.id
  });

  wishlist.items = wishlist.items.filter(
    item => item.id !== req.params.id
  );

  await wishlist.save();

  res.json(wishlist);
};