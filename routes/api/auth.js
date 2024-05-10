import express from "express";
import { model } from "../../models/index.js";
import Joi from "joi";
import { Hash } from "../../supports/Hash.js";
import { Jwt } from "../../supports/Jwt.js";

const router = express.Router();

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const register = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string(),
});

router.post("/login", async (req, res, next) => {
  try {
    const { error } = login.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = req.body;
    const user = await model.user.findUnique({
      where: { email: email },
    });
    if (!user || !new Hash().check(password, user.password)) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({ token: new Jwt().sign(user) });
  } catch (error) {
    next(error);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const { error } = register.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { username, name, email, password } = req.body;
    const existingUser = await model.user.findUnique({
      where: { email: email },
    });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const createUser = await model.user.create({
      data: {
        username: username,
        name: name,
        email: email,
        password: new Hash().make(password),
      },
    });
    res.json(createUser);
  } catch (error) {
    next(error);
  }
});

export default router;
