import { Router } from "express";
import { registerUser, LoginUser } from "../controllers/user-controller";
import stockRouter from "./stock-routes";

const rootRouter = Router();

rootRouter.use("/stock", stockRouter);
rootRouter.post("/register", registerUser);
rootRouter.post("/login", LoginUser);

export default rootRouter;
