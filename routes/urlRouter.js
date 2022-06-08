import { Router } from "express";
import {
  postUrlShorten,
  getUrlId,
  openShortUrl,
  deleteUrl,
} from "../controllers/urlController.js";

import { userTokenMiddleware } from "../middleware/userTokenMiddleware.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", userTokenMiddleware, postUrlShorten);
urlRouter.get("/urls/:id", getUrlId);
urlRouter.get("/urls/open/:shortUrl", openShortUrl);
urlRouter.delete("/urls/:id", userTokenMiddleware, deleteUrl);

export default urlRouter;
