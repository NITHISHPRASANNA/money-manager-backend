const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* 🔴 THIS LINE WAS THE PROBLEM IF MISSING */
app.use(express.json());

app.use(cors());

/* ROUTES */
app.use("/api/auth", require("./routes/auth"));
app.use("/api/transactions", require("./routes/transaction"));

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("Backend is running");
});

/* DB */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
