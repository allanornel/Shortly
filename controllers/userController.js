import db from "../db.js";

export async function getUserId(req, res) {
  const { id } = req.params;
  try {
    const findUser = await db.query(
      `SELECT u.id, u.name, SUM(l."visitCount") AS "visitCount"
    FROM users u
    JOIN links l ON u.id = l."userId"
    WHERE u.id = $1
    GROUP BY u.id;`,
      [id]
    );
    if (findUser.rowCount === 0) return res.sendStatus(404);

    const shortenedUrls = await db.query(
      'SELECT id, "shortUrl", url, "visitCount" FROM links WHERE "userId" = $1',
      [id]
    );

    res
      .status(200)
      .send({ ...findUser.rows[0], shortenedUrls: shortenedUrls.rows });
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocorreu um erro ao obter o Usuário");
  }
}
export async function getRanking(req, res) {}
