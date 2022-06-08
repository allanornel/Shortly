import { Router } from "express";
import { getRanking, getUserId } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/users/:id", getUserId);
userRouter.get("/users/ranking", getRanking);

export default userRouter;
