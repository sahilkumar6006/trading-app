import { Router } from "express";
import { registerUser, LoginUser } from "../controllers/user-controller";

const rootRouter = Router();

rootRouter.post("/register", registerUser);
rootRouter.post("/login", LoginUser);

export default rootRouter;
