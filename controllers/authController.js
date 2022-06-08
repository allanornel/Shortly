import db from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signUp(req, res) {
  const { name, email, password } = req.body;
  const passwordHash = bcrypt.hashSync(password, 10);
  try {
    let findEmail = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (findEmail.rowCount > 0) {
      return res.status(409).send("Email já cadastrado!");
    }
    await db.query(
      "INSERT INTO users(name, email, password) VALUES ($1, $2, $3)",
      [name, email.toLowerCase(), passwordHash]
    );
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocorreu um erro ao obter ao Cadastrar");
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  try {
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rowCount === 0) return res.sendStatus(401);

    if (bcrypt.compareSync(password, user.rows[0].password)) {
      const userData = { name: user.rows[0].name, email };
      const secretKey = process.env.JWT_SECRET;
      const token = jwt.sign(userData, secretKey, { expiresIn: 60 * 60 * 24 });
      await db.query(`INSERT INTO sessions("userId", token) VALUES ($1, $2)`, [
        user.rows[0].id,
        token,
      ]);
      res.status(200).send(token);
    } else {
      return res.sendStatus(401);
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocorreu um erro ao obter ao Logar");
  }
}
