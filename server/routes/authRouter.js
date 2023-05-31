import { Router } from "express";
import bcrypt from "bcrypt";
import db from "../database/connection.js";
import "dotenv/config";
import transporter from "../mail/config.js";

const router = Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPass = await bcrypt.hash(password.toString(), 12);
    const register = await db.query(
      "INSERT INTO users (email,password) VALUES (?,?)",
      [email, hashedPass]
    );

    const mailInfo = transporter.sendMail({
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: "Registration!",
      text: "Thanks for registering!",
    }, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        res.status(200).send({ message: "You have successfully signed up!", register, mail: { info: info } });
      }
    });
    
  } catch (error) {
       res.status(400).send({message: "This email has already been taken."});
  }
});

router.get("/login", (req, res) => {
  const authenticated = !!req.session.user;
  res.status(200).send({ authenticated, user: req.session.user });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password);
    const [users] = await db.query(
      "SELECT * from users where email = ?;",
      email
    );
    const user = users[0];
    console.log(user);
    if (!!user) {
      const comparePasswords = await bcrypt.compare(
        password.toString(),
        user.password
      );
      if (comparePasswords) {
        req.session.user = user;
        res.status(200).send(user);
      } else {
        res.status(401).send({ message: "Wrong login - Try again" });
      }
    } else {
      res
        .status(401)
        .send({ message: "The email has not been registered yet. " });
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong." });
  }
});

router.get("/destroy", (req, res) => {
  req.session.destroy();
  res.status(200).send({ message: "Session user_id deleted" });
});

export default router;