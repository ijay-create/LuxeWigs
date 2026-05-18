import nodemailer from "nodemailer";

export const sendOrderEmail = async ({
  email,
  name,
  order
}) => {

  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // SAFE ITEMS
    const itemsList = order.items
      ?.map(
        (item) =>
          `${item.name} x ${item.quantity}`
      )
      .join("\n");

    const mailOptions = {

      from: `"LuxeWigs" <${process.env.EMAIL_USER}>`,

      to: email,

      subject: "Your LuxeWigs Receipt 🛍️",

      text: `
Hello ${name},

Thank you for shopping with LuxeWigs 💖

Order Reference:
${order.reference}

Items:
${itemsList}

Total:
₦${Number(order.totalAmount).toLocaleString()}

Your order is being processed successfully.
      `
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ EMAIL SENT SUCCESSFULLY");

  } catch (error) {

    console.log("❌ Email failed:", error.message);

  }

};