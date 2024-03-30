import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";

dotenv.config();

const router = express.Router();

router.post("/jwt/:sign", async (req, res, next) => {
  const payload = {
    name: "fanji",
    address: "Bandung",
  };
  const token = jwt.sign({ payload }, process.env.JWT_SECRET);
  res.json({
    token: token,
  });
});

router.get("/jwt/:verify", async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    res.json(decode);
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

export default router;
