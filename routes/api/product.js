import { BadRequestException } from "../../exceptions/BadRequestException.js";
import express from "express";
import { model } from "../../models/index.js";

const router = express.Router();

router.get("/products", async (req, res, next) => {
  try {
    const products = await model.product.findMany();
    return res.json(products);
  } catch (error) {
    console.error(error);
    return res.json({ message: error.message });
  }
});

router.get("/products/:id", async (req, res, next) => {
  try {
    const product = await model.product.findFirst({
      where: {
        id: req.params.id,
      },
    });

    return res.json(product);
  } catch (error) {
    return res.json({ message: error.message });
  }
});

router.post("/products", async (req, res, next) => {
  try {
    const productByCode = await model.product.findFirst({
      where: {
        name: req.body.name,
      },
    });

    if (productByCode) {
      throw new BadRequestException("product code already exist");
    }

    const createdProduct = await model.product.create({
      data: {
        name: req.body.name,
        price: req.body.price,
      },
    });

    return res.json(createdProduct);
  } catch (error) {
    return next(error);
  }
});

export default router;
