const nodemailer = require("nodemailer");
const Inventory = require("../models/inventory");
const moment = require("moment");
const cron = require("node-cron");

async function getProductsWithinDateRange() {
  const threeWeeksFromNow = moment().add(3, "weeks").toDate();

  try {
    const products = await Inventory.find({
      expiryDate: {
        $gte: new Date(),
        $lt: threeWeeksFromNow,
      },
    }).exec();

    return products;
  } catch (error) {
    console.error("Error querying products:", error);
    return [];
  }
}

async function getProductsWithLessQuantity() {
  // Find products with quantityInStock less than 20
  try {
    const products = await Inventory.find({
      quantityInStock: { $lt: 20 },
    }).exec();
    return products;
    // console.log("Products with quantityInStock less than 20:", products);
  } catch (error) {
    console.error("Error querying products:", error);
    return [];
  }
}

//  Send email notification
async function sendEmail(products) {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  transporter.verify().then(console.log).catch(console.error);

  const mailOptions = {
    from: process.env.EMAIL,
    to: "pinoma1716@v2ssr.com",
    subject: "Products Expiring Soon",
    text: `The following products are expiring soon:\n\n${products
      .map((product) => product.name)
      .join("\n")}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

//  Send email notification
async function sendQuantityEmail(products) {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  transporter.verify().then(console.log).catch(console.error);

  const mailOptions = {
    from: process.env.EMAIL,
    to: "pinoma1716@v2ssr.com",
    subject: "Products With Less Quantity",
    text: `The following products have less than 20 items in stock:\n\n${products
      .map((product) => product.name)
      .join("\n")}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

function startScheduledTask() {
  // Schedule the task to run every 3 minutes
  // cron.schedule("*/3 * * * *", async () => {
  //   console.log("Running task...");

  //   const products = await getProductsWithinDateRange();
  //   const productWithLessQuantity = await getProductsWithLessQuantity(products);

  //   if (products.length > 0) {
  //     await sendEmail(products);
  //   }
  //   if (productWithLessQuantity.length > 0) {
  //     await sendQuantityEmail(productWithLessQuantity);
  //   }
  // });

  // Schedule the task to run every Monday at 9 AM
  cron.schedule("0 9 * * 1", async () => {
    console.log("Running task...");

    const products = await getProductsWithinDateRange();
    const productWithLessQuantity = await getProductsWithLessQuantity(products);

    if (products.length > 0) {
      await sendEmail(products);
    }

    if (productWithLessQuantity.length > 0) {
      await sendQuantityEmail(productWithLessQuantity);
    }
  });
}

module.exports = {
  startScheduledTask,
};
