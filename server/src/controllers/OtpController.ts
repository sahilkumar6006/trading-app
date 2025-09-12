import { Request, Response } from "express";
import { sendMail } from "../services/mailSender";
import Otp from "../models/Otp-model";
import { ApiError } from "../utils/ApiError";
import User from "../models/user-model";

const generateRanmdomOtp = () => {
  return Math.floor(Math.random() * 10000);
};
const sendOtp = async (request: Request, response: Response) => {
  try {
    const { email } = request.body;
    console.log(email);
    const totp = generateRanmdomOtp();

    console.log(totp);

    const otp = await Otp.findOne({ email });
    if (otp) throw new ApiError(400, "OTP already exists");
    const newOtp = new Otp({
      email,
      otp: totp,
      otp_type: "email",
    });
    await newOtp.save();

    sendMail(email, email, `Your OTP is ${totp}`);
    response.status(201).json({ message: `OTP sent successfully ${totp}` });
  } catch (error) {
    console.log(error);
  }
};

const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  console.log(email, otp);
  if (!email || !otp) throw new ApiError(400, "Invalid data");
  try {
    const otpFromDb = await Otp.findOne({ email });
    if (!otpFromDb) throw new ApiError(400, "OTP not found");
    if (otpFromDb.otp !== otp) throw new ApiError(400, "Invalid OTP");
    const user = await User.findOne({ email });

    if (!user) throw new ApiError(400, "User not found");

    const accessToken = await User.createAccessToken(email);

    res.status(200).json({
      message: "OTP verified successfully",
      accessToken,
      user,
    });

    console.log("in the user", user);
  } catch (error) {
    console.log("in the error", error);
  }
};

export { generateRanmdomOtp, sendOtp, verifyOtp };
