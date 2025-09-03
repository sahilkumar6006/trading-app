import Order from "../models/Order-model";
import { ApiError } from "../utils/ApiError";
import { Request, Response, NextFunction } from "express";

const createOrder = async (req: Request, res: Response) => {
  const { user, stock, quantity, price, type, remainingBalance } = req.body;
  if (!user || !stock || !quantity || !price || !type || !remainingBalance)
    throw new ApiError(400, "Invalid data");
  try {
    const order = await Order.findOne({ user });
    if (order) throw new ApiError(400, "Order already exists");
    const newOrder = new Order({
      user,
      stock,
      quantity,
      price,
      type,
      remainingBalance,
    });
    await newOrder.save();
    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    throw new ApiError(400, "Unable to Create Order");
  }
};

export { createOrder };
