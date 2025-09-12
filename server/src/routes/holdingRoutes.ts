import { Router } from "express";

const holdingRoutes = Router();

import {
  createHolding,
  getHoldings,
  getHoldingById,
  updateHolding,
  deleteHolding,
  getPortfolioValue,
} from "../controllers/holding-controller";

holdingRoutes.post("/create", createHolding);
holdingRoutes.get("/holdings/:userId", getHoldings);
holdingRoutes.get("/holdings/:id", getHoldingById);
holdingRoutes.put("/holdings/:id", updateHolding);
holdingRoutes.delete("/holdings/:id", deleteHolding);
holdingRoutes.get("/portfolio/:userId", getPortfolioValue);

export default holdingRoutes;
