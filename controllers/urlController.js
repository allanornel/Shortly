import { nanoid } from "nanoid";
import db from "../db.js";

export async function postUrlShorten(req, res) {
  const { url } = req.body;
  const { userId } = res.locals.session;
  let checkShort = true;
  let shortUrl;

  while (checkShort) {
    shortUrl = nanoid(6);
    const findShortUrl = await db.query(
      `SELECT * FROM links WHERE "shortUrl" = $1`,
      [shortUrl]
    );
    if (findShortUrl.rowCount === 0) checkShort = false;
  }
  await db.query(
    `INSERT INTO links(url, "shortUrl", "userId") VALUES ($1, $2, $3)`,
    [url, shortUrl, userId]
  );
  res.status(200).send(shortUrl);
}

export async function getUrlId(req, res) {}

export async function openShortUrl(req, res) {}
