const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 8080;
const uri = process.env.MONGODB_URI;

// import routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/data");
const archiveProductRoutes = require("./routes/archive");
const usersRoutes = require("./routes/users");
const salesRoutes = require("./routes/sales");

// import query service

const queryService = require("./services/queryservice.js");

const app = express();

// Disable the "X-Powered-By" header
app.disable("x-powered-by");

app.use(bodyParser.json());

// Prevent cors errors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRoutes);
app.use("/v1", productRoutes);
app.use("/v1", archiveProductRoutes);
app.use("/v1", usersRoutes);
app.use("/v1", salesRoutes);

// error handling middleware
app.use((error, req, res, next) => {
  console.log(error);
  // logger.error(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(uri, options)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(port, () => {
      //   logger.info(`Server started on port ${port}`);
      console.log(`Server running at http://localhost:${port}`);
      // Execute code from queryservice.js
      queryService.startScheduledTask();
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error", error);
    // logger.error(error);
  });
