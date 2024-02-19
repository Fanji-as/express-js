import dotenv from "dotenv";
import express from "express";
import users from "./users.json" assert { type: "json" };

dotenv.config();
const app = express();

app.get("/users", (req, res, next) => {
  return res.json(users);
});

app.listen(process.env.PORT);
