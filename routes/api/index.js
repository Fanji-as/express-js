import express from "express";
import shop from "./shop.js";
import product from "./product.js";
import transaction from "./transaction.js";
import item from "./item.js";
import payment from "./payment.js";

const router = express.Router();

router.use(shop);
router.use(product);
router.use(transaction);
router.use(item);
router.use(payment);

export default router;
