import { Request, Response, NextFunction } from "express";
import Stock from "../models/stock-model";
import { ApiError } from "../utils/ApiError";

const createStocks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    symbol,
    companyName,
    iconUrl,
    lastDayTradedPrice,
    currentPrice,
    dayTimeSeries,
    tenMinTimeSeries,
  } = req.body;
  console.log("req body checkint", req.body);
  if (
    !symbol ||
    !companyName ||
    !iconUrl ||
    !lastDayTradedPrice ||
    !currentPrice ||
    !dayTimeSeries ||
    !tenMinTimeSeries
  )
    throw new ApiError(400, "Invalid data");
  try {
    const stock = await Stock.findOne({ symbol });
    if (stock) throw new ApiError(400, "Stock already exists");
    const newStock = new Stock({
      symbol,
      companyName,
      iconUrl,
      lastDayTradedPrice,
      currentPrice,
      dayTimeSeries,
      tenMinTimeSeries,
    });
    await newStock.save();
    res.status(201).json({ message: "Stock created successfully" });
  } catch (error) {
    throw new ApiError(400, "Unable to Create Stock");
  }
};

const getStocks = async (req: Request, res: Response) => {
  try {
    const stocks = await Stock.find();
    res.status(200).json({ stocks });
  } catch (error) {
    throw new ApiError(400, "Unable to get Stocks");
  }
};

export { createStocks, getStocks };
