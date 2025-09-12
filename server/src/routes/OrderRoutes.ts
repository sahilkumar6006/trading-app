import { createOrder, getOrderDetails } from "../controllers/OrderController";
import { Router } from "express";

const OrderRoutes = Router();

OrderRoutes.post("/create", createOrder);
OrderRoutes.post("/details", getOrderDetails);

export default OrderRoutes;
