import item from "./item.js";
import payment from "./payment.js";
import product from "./product.js";
import shop from "./shop.js";
import transaction from "./transaction.js";
import express from "express";

const router = express.Router();

router.use(shop);
router.use(product);
router.use(transaction);
router.use(item);
router.use(payment);

export default router;
