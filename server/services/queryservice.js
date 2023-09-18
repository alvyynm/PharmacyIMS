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

// Schedule the task to run every Monday at 9 AM
// cron.schedule("0 9 * * 1", async () => {
//   console.log("Running task...");

//   const products = await getProductsWithinDateRange();

//   if (products.length > 0) {
//     await sendEmail(products);
//   }
// });

function startScheduledTask() {
  // Schedule the task to run every 3 minutes
  cron.schedule("*/3 * * * *", async () => {
    console.log("Running task...");

    const products = await getProductsWithinDateRange();

    if (products.length > 0) {
      await sendEmail(products);
    }
  });
}

module.exports = {
  startScheduledTask,
};
