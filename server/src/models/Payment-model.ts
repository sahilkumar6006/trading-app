import mongoose from "mongoose";

interface IPayment {
  user: string;
  order: string;
  paymentId: string;
  paymentStatus: string;
  createdAt: Date;
}

const PaymentSchema = new mongoose.Schema<IPayment>({
  user: {
    type: String,
    required: true,
  },

  order: {
    type: String,
    required: true,
  },

  paymentId: {
    type: String,
    required: true,
  },
});
PaymentSchema.index({ user: 1, order: 1 }, { unique: true });

const Payment = mongoose.model<IPayment>("Payment", PaymentSchema);
