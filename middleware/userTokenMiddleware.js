import db from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function userTokenMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();
  const secretKey = process.env.JWT_SECRET;
  if (!token) return res.status(401).send("Token Inexistente");

  try {
    const data = jwt.verify(token, secretKey);
    if (!data) return res.status(401).send("Token Inexistente ou Expirado");
    const session = await db.query("SELECT * FROM sessions WHERE token=$1", [
      token,
    ]);
    if (session.rowCount === 0)
      return res.status(401).send("Token Inexistente ou Expirado");

    res.locals.session = { userId: session.rows[0].userId };
    next();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
