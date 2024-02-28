import express from "express";
import { model } from "../../models/index.js";

const router = express.Router();

router.get("/items", async (req, res, next) => {
  try {
    const item = await model.item.findMany();
    return res.json(item);
  } catch (error) {
    return res.json({ message: error.message });
  }
});

router.get("/items/:name", async (req, res, next) => {
  try {
    const item = await model.item.findFirst({
      where: {
        name: req.params.name,
      },
    });
    return res.json(item);
  } catch (error) {
    return res.json({ message: error.message });
  }
});

router.post("/items", async (req, res, next) => {
  console.log(req.body);
  try {
    const itemByCode = await model.item.findFirst({
      where: {
        code: req.body.code,
      },
    });
    if (itemByCode) {
      throw new Error("item already exist");
    }
    const createdItem = await model.item.create({
      data: {
        code: req.body.code,
        total: req.body.transaction,
      },
    });
    return res.json(createdItem);
  } catch (error) {
    console.error(error);
    if (error.message === "item already exist") {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
});

export default router;
