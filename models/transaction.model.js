import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
    },
    investmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Investment",
    },
    currentBalance: {
      type: Number,
    },
    type: {
      type: String,
      enum: ["investment", "daily", "withdrawal", "bonus", "referral"],
    },
  },
  {
    timestamps: true,
  }
);

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);

export default Transaction;
