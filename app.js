import { BadRequestException } from "./exceptions/BadRequestException.js";
import { NotFoundException } from "./exceptions/NotFoundException.js";
import router from "./routes/api/index.js";
import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();

app.use(express.json());
app.use(router);

app.use(function (req, res, next) {
  throw new NotFoundException("URL not found.");
});
app.use(function (err, req, res, next) {
  if (err instanceof BadRequestException) {
    return res.status(400).json({ message: err.message });
  }

  if (err instanceof NotFoundException) {
    return res.status(404).json({ message: err.message });
  }

  return res.status(500).json({ message: err.message });
});

app.listen(process.env.PORT);
