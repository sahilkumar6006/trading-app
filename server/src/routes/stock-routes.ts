import { Router } from "express";
import { createStocks, getStocks } from "../controllers/stock-model";

const stockRouter = Router();

stockRouter.post("/stocks", createStocks);
stockRouter.get("/stocks", getStocks);

export default stockRouter;
