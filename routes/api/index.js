import item from "./item.js";
import payment from "./payment.js";
import product from "./product.js";
import shop from "./shop.js";
import transaction from "./transaction.js";
import express from "express";
import jwt from "./jwt.js";
import auth from "./auth.js";
import users from "./users.js"

const router = express.Router();

router.use(shop);
router.use(product);
router.use(transaction);
router.use(item);
router.use(payment);
router.use(jwt);
router.use(auth);
router.use(users);

export default router;
