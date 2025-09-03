import User from "../models/user-model";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import bcrypt from "bcryptjs";

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    email,
    password,
    name,
    login_pin,
    phone_number,
    date_of_birth,
    biometrictKey,
    gender,
    wrong_pin_attempts,
    blocked_until_pin,
    balance,
  } = req.body;
  if (
    !email ||
    !password ||
    !name ||
    !login_pin ||
    !phone_number ||
    !date_of_birth ||
    !biometrictKey ||
    !gender ||
    !wrong_pin_attempts ||
    !blocked_until_pin ||
    !balance
  )
    throw new ApiError(400, "Invalid data");
  if (wrong_pin_attempts < 0) throw new ApiError(400, "Invalid data");
  if (balance < 0) throw new ApiError(400, "Invalid data");

  try {
    const user = await User.findOne({ email });
    if (user) throw new ApiError(400, "User already exists");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashedPin = await bcrypt.hash(login_pin, salt);
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      login_pin: hashedPin,
      phone_number,
      date_of_birth,
      biometrictKey,
      gender,
      wrong_pin_attempts,
      blocked_until_pin,
      balance,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

const LoginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ApiError(400, "Invalid data");

  try {
    const user = await User.findOne({ email });
    if (!user) throw new ApiError(400, "User not found");
    if (!user.comparePassword(password))
      throw new ApiError(400, "Invalid data");
    const accessToken = await User.createAccessToken(email);
    return res.status(200).json({ accessToken });
  } catch (error) {
    return new ApiError(400, "Invalid data");
  }
};

export { registerUser, LoginUser };
