import { Router } from "express";
import { registerUser, LoginUser } from "../controllers/user-controller";
import stockRouter from "./stock-routes";
import otpRouter from "./otpRoutes";
import holdingRoutes from "./holdingRoutes";
import OrderRoutes from "./OrderRoutes";

const rootRouter = Router();

rootRouter.use("/stock", stockRouter);
rootRouter.post("/register", registerUser);
rootRouter.post("/login", LoginUser);
rootRouter.use("/otp", otpRouter);
rootRouter.use("/holding", holdingRoutes);
rootRouter.use("/order", OrderRoutes);

export default rootRouter;
