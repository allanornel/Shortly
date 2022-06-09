import { Router } from "express";
import { getRanking, getUserId } from "../controllers/userController.js";
import { userTokenMiddleware } from "../middleware/userTokenMiddleware.js";

const userRouter = Router();

userRouter.get("/users/:id", userTokenMiddleware, getUserId);
userRouter.get("/ranking", getRanking);

export default userRouter;
