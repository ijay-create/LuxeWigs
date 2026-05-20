import nodemailer from "nodemailer";

export const sendOrderEmail = async ({
  email,
  name,
  order
}) => {

  try {

    console.log("📨 Preparing email...");

    // CREATE TRANSPORTER
    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // VERIFY SMTP CONNECTION
    await transporter.verify();

    console.log("✅ SMTP VERIFIED");

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

    // SEND EMAIL
    const info = await transporter.sendMail(mailOptions);

    console.log("✅ EMAIL SENT SUCCESSFULLY");
    console.log("📨 MESSAGE ID:", info.messageId);

  } catch (error) {

    console.log("❌ EMAIL ERROR:");
    console.log(error);

  }

};