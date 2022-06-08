import { Router } from "express";
import {
  postUrlShorten,
  getUrlId,
  openShortUrl,
} from "../controllers/urlController.js";

import { userTokenMiddleware } from "../middleware/userTokenMiddleware.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", userTokenMiddleware, postUrlShorten);
urlRouter.get("/urls/:id", getUrlId);
urlRouter.get("/urls/open/:shortUrl", openShortUrl);

export default urlRouter;
