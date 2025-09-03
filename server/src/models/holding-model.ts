import mongoose from "mongoose";

interface IHolding {
  user: string;
  stock: string;
  quantity: number;
  buyPrice: number;
  createdAt: Date;
}

const HoldingSchema = new mongoose.Schema<IHolding>({
  user: {
    type: String,
    required: true,
  },

  stock: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },

  buyPrice: {
    type: Number,
    required: true,
  },
});

const Holding = mongoose.model<IHolding>("Holding", HoldingSchema);

export default Holding;
