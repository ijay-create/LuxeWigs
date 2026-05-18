import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const seedAdmin = async () => {
  try {
    console.log("SCRIPT STARTED");

    await mongoose.connect(process.env.MONGO_URI);
    console.log("CONNECTED TO DB");

    const adminExists = await User.findOne({ email: "admin@luxewigs.com" });

    if (adminExists) {
      console.log("ADMIN ALREADY EXISTS");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Admin",
      email: "admin@luxewigs.com",
      password: hashedPassword,
      isAdmin: true
    });

    console.log("ADMIN CREATED SUCCESSFULLY");

    process.exit();

  } catch (error) {
    console.log("SEED ERROR:", error);
    process.exit(1);
  }
};

seedAdmin();