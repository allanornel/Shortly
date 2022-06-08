import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import { signUpSchema, singInSchema } from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post("/signup", signUpSchema, signUp);
authRouter.post("/signin", singInSchema, signIn);

export default authRouter;
