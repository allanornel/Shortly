import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./routes/authRouter.js";
import urlRouter from "./routes/urlRouter.js";
import userRouter from "./routes/userRouter.js";

//express config
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

//routes
app.use(authRouter);
app.use(urlRouter);
app.use(userRouter);

// app.use(productRouter);
// app.use(cartRouter);

//open server
app.listen(process.env.PORT, () =>
  console.log("Server ON port " + process.env.PORT)
);
