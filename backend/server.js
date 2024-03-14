const express = require("express");
const userRoutes = require("./routes/users");
require("dotenv").config();

const app = express();
const mongoose = require("mongoose");

// Middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/users", userRoutes);

// connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
    // port open and listening for requests
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
