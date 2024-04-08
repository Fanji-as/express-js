import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";

dotenv.config();

const router = express.Router();

router.post("/jwt/sign", async (req, res, next) => {
  const { username, name, email, password } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and address are required" });
  }
  const payload = {
    username,
    name,
    email,
    password,
  };
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: process.env.JWT_ALGORITHM,
    });
    res.json({
      token: token,
    });
  } catch (error) {
    next(error);
  }
});

router.get(
  "/jwt/verify",
  expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: [process.env.JWT_ALGORITHM],
    isRevoked: (req, jwt) => {
      req.jwt = jwt.payload;
    },
  }),
  async (req, res, next) => {
    res.json(req.jwt);
  }
);

export default router;
