import { BadRequestException } from "../../exceptions/BadRequestException.js";
import { model } from "../../models/index.js";
import express from "express";

const router = express.Router();

router.get("/shops", (req, res, next) => {
  model.shop
    .findMany()
    .then(function (shops) {
      return res.json(shops);
    })
    .catch(function (error) {
      return next(error);
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
      return next(error);
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
      throw new BadRequestException("Shop code already exist.");
    }

    const shop = await model.shop.create({
      data: {
        name: req.body.name,
        city: req.body.city,
        address: req.body.address,
        zip_code: req.body.zip_code,
        code: req.body.code,
      },
    });

    return res.json(shop);
  } catch (error) {
    return next(error);
  }
});

export default router;
