import { nanoid } from "nanoid";
import db from "../db.js";

export async function postUrlShorten(req, res) {
  const { url } = req.body;
  const { userId } = res.locals.session;
  let checkShort = true;
  let shortUrl;
  try {
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
    res.status(200).send({ shortUrl });
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocorreu um erro ao cadastrar a URL");
  }
}

export async function getUrlId(req, res) {
  const { id } = req.params;
  try {
    const url = await db.query(
      'SELECT id, "shortUrl", url FROM links WHERE id = $1',
      [id]
    );
    if (url.rowCount === 0) return res.sendStatus(404);

    return res.status(200).send(url.rows[0]);
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocorreu um erro ao obter a URL");
  }
}

export async function openShortUrl(req, res) {
  const { shortUrl } = req.params;
  try {
    const search = await db.query(
      `SELECT url FROM links WHERE "shortUrl" = $1`,
      [shortUrl]
    );
    if (search.rowCount === 0) return res.sendStatus(404);

    await db.query(
      'UPDATE links SET "visitCount"="visitCount"+1 WHERE "shortUrl"=$1',
      [shortUrl]
    );

    return res.redirect(search.rows[0].url);
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocorreu um erro ao obter a URL");
  }
}

export async function deleteUrl(req, res) {
  const { userId } = res.locals.session;
  const { id } = req.params;
  try {
    const findUrl = await db.query("SELECT * FROM links WHERE id=$1", [id]);
    if (findUrl.rowCount === 0) return res.sendStatus(404);
    if (findUrl.rows[0].userId !== userId) return res.sendStatus(401);

    await db.query("DELETE FROM links WHERE id=$1", [id]);
    return res.sendStatus(204);
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocorreu um erro ao deleter a URL");
  }
}
