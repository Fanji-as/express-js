import express from "express";
import { UserController } from "../../http/controller/api/v1/UserController.js";
import { UserValidator } from "../../http/validators/UserValidator.js";
import {validateToken} from "../../http/middleware/jwtVerify.js";

const router = express.Router();

router.get("/users", validateToken, UserValidator.index, UserController.index);

export default router;
