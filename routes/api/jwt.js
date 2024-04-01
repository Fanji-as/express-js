import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";

dotenv.config();

const router = express.Router();

router.post("/jwt/sign", async (req, res, next) => {
  const payload = {
    name: "fanji",
    address: "Bandung",
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: process.env.JWT_ALGORITHM,
  });
  res.json({
    token: token,
  });
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
