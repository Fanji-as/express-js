import express from "express";
import { model } from "../../models/index.js";

const router = express.Router();

router.get("/shops", (req, res, next) => {
  model.shop
    .findMany()
    .then(function (shops) {
      return res.json(shops);
    })
    .catch(function (error) {
      return res.json({ message: error.message });
    });
});

router.get("/shops/:code", (req, res, next) => {
  model.shop
    .findFirst({
      where: {
        code: req.params.code,
      },
    })
    .then(function (shop) {
      return res.json(shop);
    })
    .catch(function (error) {
      return res.json({ message: error.message });
    });
});

router.post("/shops", async (req, res, next) => {
  try {
    const shopByCode = await model.shop.findFirst({
      where: {
        code: req.body.code,
      },
    });
    if (shopByCode) {
      throw new Error("shop code already exist");
    }
    const createdShop = await model.shop.create({
      data: {
        name: req.body.name,
        city: req.body.city,
        address: req.body.address,
        zip_code: req.body.zip_code,
        code: req.body.code,
      },
    });
    return res.json(createdShop);
  } catch (error) {
    console.error(error);
    if (error.message === "shop code already exist") {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
});

export default router;
