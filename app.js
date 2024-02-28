import dotenv from "dotenv";
import express from "express";
import { model } from "./models/index.js";

dotenv.config();
const app = express();

app.use(express.json());

app.get("/shops", (req, res, next) => {
  model.shop
    .findMany()
    .then(function (shops) {
      return res.json(shops);
    })
    .catch(function (error) {
      return res.json({ message: error.message });
    });
});

app.get("/products", async (req, res, next) => {
  try {
    const products = await model.product.findMany();
    return res.json(products);
  } catch (error) {
    console.error(error);
    return res.json({ message: error.message });
  }
});

app.get("/transactions", async (req, res, next) => {
  try {
    const transactions = await model.product.findMany();
    return res.json(transactions);
  } catch (error) {
    console.error(error);
    return res.json({ message: error.message });
  }
});

app.get("/items", async (req, res, next) => {
  try {
    const item = await model.item.findMany();
    return res.json(item);
  } catch (error) {
    return res.json({ message: error.message });
  }
});

app.get("/payments", async (req, res, next) => {
  try {
    const payment = await model.payment.findMany();
    return res.json(payment);
  } catch (error) {
    return res.json({ message: error.message });
  }
});

app.get("/shops/:code", (req, res, next) => {
  model.shop
    .findFirst({
      where: {
        code: "2744462952",
      },
    })
    .then(function (shop) {
      return res.json(shop);
    })
    .catch(function (error) {
      return res.json({ message: error.message });
    });
});

app.get("/products/:id", async (req, res, next) => {
  try {
    const product = await model.product.findFirst({
      where: {
        id: req.params.id,
      },
    });
    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.json({ message: error.message });
  }
});

app.get("/transactions/:code", async (req, res, next) => {
  try {
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

app.get("/items/:name", async (req, res, next) => {
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

app.get("/payments/:code", async (req, res, next) => {
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

app.post("/shop", async (req, res, next) => {
  console.log(req.body);
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

app.post("/product", async (req, res, next) => {
  console.log(req.body);
  try {
    const productByCode = await model.product.findFirst({
      where: {
        name: req.body.name,
      },
    });
    if (productByCode) {
      throw new Error("product code already exist");
    }
    const createdProduct = await model.product.create({
      data: {
        name: req.body.name,
        price: req.body.product,
      },
    });
    return res.json(createdProduct);
  } catch (error) {
    console.error(error);
    if (error.message === "product code already exist") {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
});

app.post("/transaction", async (req, res, next) => {
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

app.post("/item", async (req, res, next) => {
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

app.post("/payment", async (req, res, next) => {
  console.log(req.body);
  try {
    const paymentByCode = await model.payment.findFirst({
      where: {
        code: req.body.code,
      },
    });
    if (paymentByCode) {
      throw new Error("payment already exist");
    }
    const createdPayment = await model.item.create({
      data: {
        code: req.body.code,
        total: req.body.transaction,
      },
    });
    return res.json(createdPayment);
  } catch (error) {
    console.error(error);
    if (error.message === "payment already exist") {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
});

app.get("/transaction", async (req, res) => {
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

app.listen(process.env.PORT);
