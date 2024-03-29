import { BadRequestException } from "../../exceptions/BadRequestException.js";
import express from "express";
import { model } from "../../models/index.js";

const router = express.Router();

router.get("/payments", async (req, res, next) => {
  try {
    const payment = await model.payment.findMany();
    return res.json(payment);
  } catch (error) {
    return res.json({ message: error.message });
  }
});

router.get("/payments/:code", async (req, res, next) => {
  try {
    const payment = await model.payment.findFirst({
      where: {
        code: req.params.code,
      },
    });
    return res.json(payment);
  } catch (error) {
    return res.json({ message: error.message });
  }
});

router.post("/payments", async (req, res, next) => {
  try {
    const paymentByCode = await model.payment.findFirst({
      where: {
        code: req.body.code,
      },
    });
    if (paymentByCode) {
      throw new BadRequestException("payment already exist");
    }
    const createdPayment = await model.item.create({
      data: {
        code: req.body.code,
        total: req.body.transaction,
      },
    });

    return res.json(createdPayment);
  } catch (error) {
    return next(error);
  }
});

export default router;
