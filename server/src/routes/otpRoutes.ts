import { Router } from "express";
import { sendOtp, verifyOtp } from "../controllers/OtpController";

const otpRouter = Router();

otpRouter.post("/otp", sendOtp);
otpRouter.post("/verify", verifyOtp);

export default otpRouter;
