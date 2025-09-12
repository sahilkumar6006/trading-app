import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface IOtp {
  email: string;
  otp: string;
  otp_type: string;
  createdAt: Date;
}

const OtpSchema = new mongoose.Schema<IOtp>({
  email: {
    type: String,
    required: true,
  },

  otp: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },

  otp_type: {
    type: String,
    required: true,
    enum: ["email", "phone", "reset_password", "reset_pin"],
  },
});

const Otp = mongoose.model<IOtp>("Otp", OtpSchema);

export default Otp;
