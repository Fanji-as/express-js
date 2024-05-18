import express from "express";
import { AuthController } from "../../http/controller/api/v1/Authcontroller.js";
import { AuthValidator } from "../../http/validators/AuthValidator.js";

const router = express.Router();

router.post("/login", AuthValidator.login, AuthController.login);

router.post("/register", AuthValidator.register, AuthController.register);

export default router;
