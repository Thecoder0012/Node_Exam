import { Router } from "express";
import bcrypt from "bcrypt";
import db from "../database/connection.js";
import "dotenv/config";
import transporter from "../mail/config.js";

const router = Router();

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPass = await bcrypt.hash(password.toString(), 12);
    const register = await db.query(
      "INSERT INTO users (username, email,password) VALUES (?,?,?)",
      [username, email, hashedPass]
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

router.use((req, res, next) => {
  console.log('Session:', req.session);
  next();
});

router.get("/login", (req, res) => {
  const authenticated = !!req.session.user;
  res.status(200).send({ authenticated, user: req.session.user });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const [users] = await db.query(
      "SELECT * from users where email = ?;",
      email
    );
    const user = users[0];
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

router.post("/contact",(req,res) => {
  const { name,email,message } = req.body;

  const mailInfo = transporter.sendMail({
    from: email,
    to: process.env.NODEMAILER_USER,
    subject: name,
    text: message,
  }, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      res.status(200).send({ message: "You have successfully sent a message!"});
    }
  });


  setTimeout(() => {
    const reply = transporter.sendMail({
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: name,
      text: "Thanks for sending a message. We will respond look at your message asap!",
    }, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        res.status(200).send({ message: "You have successfully sent a message!"});
      }
    });
  },5000)

  res.status(200).send({message: "Message sent again!"})
})




router.get("/destroy", (req, res) => {
  req.session.destroy();
  res.status(200).send({ message: "Session user_id deleted" });
});

export default router;