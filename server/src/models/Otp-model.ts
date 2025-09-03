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

OtpSchema.pre("save", async function (next) {
  if (this.isNew) {
    const salt = await bcrypt.genSalt(10);
    await sendVerificationMail(this.email, this.otp, this.otp_type);
    this.otp = await bcrypt.hash(this.otp, salt);
  }
  next();
});

OtpSchema.methods.compareOtp = async function (enteredOtp: string) {
  return await bcrypt.compare(enteredOtp, this.otp);
};

async function sendVerificationMail(
  email: string,
  otp: string,
  otp_type: string
) {
  try {
    // const result = await mailSender(email, otp, otp_type);
  } catch (error) {
    console.log(error);
  }
}
