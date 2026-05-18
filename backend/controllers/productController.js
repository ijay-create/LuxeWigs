import Product from "../models/Product.js";

/* =========================
   SEARCH PRODUCTS
========================= */
export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;

    const filter = q
      ? {
          $or: [
            { name: { $regex: q, $options: "i" } },
            { category: { $regex: q, $options: "i" } },
            { description: { $regex: q, $options: "i" } }
          ]
        }
      : {};

    const products = await Product.find(filter).sort({ createdAt: -1 });

    return res.json({
      success: true,
      products
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Search failed"
    });
  }
};


/* =========================
   GET ALL PRODUCTS
========================= */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    return res.json({
      success: true,
      products
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products"
    });
  }
};


/* =========================
   CREATE PRODUCT
========================= */
export const createProduct = async (req, res) => {
  try {
    const { name, price, image, category, description } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, price and category are required"
      });
    }

    const product = await Product.create({
      name,
      price,
      image,
      category,
      description
    });

    return res.status(201).json({
      success: true,
      product
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create product"
    });
  }
};


/* =========================
   UPDATE PRODUCT
========================= */
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    return res.json({
      success: true,
      product
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update product"
    });
  }
};


/* =========================
   DELETE PRODUCT
========================= */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    return res.json({
      success: true,
      message: "Product deleted"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete product"
    });
  }
};