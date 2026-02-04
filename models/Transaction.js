const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    division: {
      type: String,
      enum: ["Office", "Personal"],
      required: true
    },
    description: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
