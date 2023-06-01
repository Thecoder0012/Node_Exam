import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

import http from "http";
const server = http.createServer(app);

import { Server } from "socket.io";
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["*"]
    }
});

io.on("connection", (socket) => {
  socket.on("mymessage",(data) => {
    socket.broadcast.emit("message_receiver",data)
  })
});


app.use(cookieParser());

app.use(
  session({
    key: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 60 * 1000 * 15,
      httpOnly: true,
    },
  })
);

import authRouter from "./routes/authRouter.js";
app.use(authRouter);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log("Server is running on", PORT));