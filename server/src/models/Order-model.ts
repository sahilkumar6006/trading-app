import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  stock: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stock",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["buy", "sell"],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  remainingBalance: {
    type: Number,
    default: 0,
    set: (value: number) => {
      if (value == null) return value;
      return Math.round(value * 100) / 100;
    },
  },
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
