import { Router } from "express";
import { registerUser, LoginUser } from "../controllers/user-controller";
import stockRouter from "./stock-routes";
import otpRouter from "./otpRoutes";

const rootRouter = Router();

rootRouter.use("/stock", stockRouter);
rootRouter.post("/register", registerUser);
rootRouter.post("/login", LoginUser);
rootRouter.use("/otp", otpRouter);

export default rootRouter;
