import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import { connectDB } from "./config/db.js";

dotenv.config();

connectDB();

const products = [
  {
    name: "Luxury Bone Straight",
    price: 220000,
    image: "/images/wig1.jpg",
    category: "Bone Straight",
    description: "Premium luxury bone straight wig."
  },
  {
    name: "HD Lace Frontal Wig",
    price: 180000,
    image: "/images/wig2.jpg",
    category: "Frontal Wig",
    description: "Natural HD lace frontal wig."
  },
  {
    name: "Deep Wave Wig",
    price: 250000,
    image: "/images/wig3.jpg",
    category: "Curly Wig",
    description: "Luxury deep wave human hair wig."
  },
  {
    name: "Luxury Curly Unit",
    price: 200000,
    image: "/images/wig4.jpg",
    category: "Curly Wig",
    description: "Soft curly luxury wig."
  }
];

const seedProducts = async () => {
  try {

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products Seeded Successfully ✅");

    process.exit();

  } catch (error) {

    console.log(error);

    process.exit(1);

  }
};

seedProducts();