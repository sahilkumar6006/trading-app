import { Request, Response } from "express";
import Holding from "../models/holding-model";

export const createHolding = async (req: Request, res: Response) => {
  try {
    const { user, stock, quantity, buyPrice } = req.body;

    const holding = new Holding({
      user,
      stock,
      quantity,
      buyPrice,
      createdAt: new Date(),
    });

    await holding.save();
    res.status(201).json(holding);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getHoldings = async (req: Request, res: Response) => {
  console.log("in get holdings", req.params);
  try {
    const { userId } = req.params;
    console.log(userId);
    const holdings = await Holding.find({ user: userId });
    res.status(200).json(holdings);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getHoldingById = async (req: Request, res: Response) => {
  try {
    const holding = await Holding.findById(req.params.id);
    if (!holding) {
      return res.status(404).json({ message: "Holding not found" });
    }
    res.status(200).json(holding);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateHolding = async (req: Request, res: Response) => {
  try {
    const { quantity, buyPrice } = req.body;

    const holding = await Holding.findByIdAndUpdate(
      req.params.id,
      { quantity, buyPrice },
      { new: true }
    );

    if (!holding) {
      return res.status(404).json({ message: "Holding not found" });
    }

    res.status(200).json(holding);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteHolding = async (req: Request, res: Response) => {
  try {
    const holding = await Holding.findByIdAndDelete(req.params.id);
    if (!holding) {
      return res.status(404).json({ message: "Holding not found" });
    }
    res.status(200).json({ message: "Holding deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getPortfolioValue = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const holdings = await Holding.find({ user: userId });

    let totalValue = 0;
    for (const h of holdings) {
      const currentPrice = h.buyPrice;
      totalValue += h.quantity * currentPrice;
    }

    res.status(200).json({ totalValue, holdings });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
