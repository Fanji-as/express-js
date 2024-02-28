import express from "express";
import { model } from "../../models/index.js";

const router = express.Router();

router.get("/transactions", async (req, res, next) => {
  try {
    const transactions = await model.transaction.findMany();
    return res.json(transactions);
  } catch (error) {
    console.error(error);
    return res.json({ message: error.message });
  }
});

router.get("/transactions/:code", async (req, res, next) => {
  try {
    console.log("tes", req.params);
    const transaction = await model.transaction.findFirst({
      where: {
        code: req.params.code,
      },
    });
    return res.json(transaction);
  } catch (error) {
    console.error(error);
    return res.json({ message: error.message });
  }
});

router.post("/transactions", async (req, res, next) => {
  console.log(req.body);
  try {
    const transactionByCode = await model.transaction.findFirst({
      where: {
        code: req.body.code,
      },
    });
    if (transactionByCode) {
      throw new Error("transaction already exist");
    }
    const createdTransaction = await model.transaction.create({
      data: {
        code: req.body.code,
        total: req.body.transaction,
      },
    });
    return res.json(createdTransaction);
  } catch (error) {
    console.error(error);
    if (error.message === "transaction already exist") {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
});

router.get("/transaction", async (req, res, next) => {
  try {
    const transaction = await model.transaction.findMany({
      // include: {
      //   shop: true,
      //   items: {
      //     include: {
      //       product: true,
      //     },
      //   },
      // },
      select: {
        id: true,
        shop: {
          select: {
            id: true,
          },
        },
      },
    });

    return res.json(transaction);
  } catch (error) {
    return res.json({ message: error.message });
  }
});
export default router;
