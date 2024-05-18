import { model } from "../../../../models/index.js";
import { Hash } from "../../../../supports/Hash.js";
import { Jwt } from "../../../../supports/Jwt.js";

export class AuthController {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  // eslint-disable-next-line no-unused-vars
  static async login(req, res, next) {
    try{
      let { email, password } = req.body;
      const user = await model.user.findFirst({
        where: { email: email },
      });
  
      if (user === null) {
        throw new Error("user not found");
      }
  
      const userPassword = user.password;
  
      if (!new Hash().check(password, userPassword)) {
        throw new Error("password not match");
      }
      const token = new Jwt().sign(user);
      return res.json({ message: "succes", token:token});
    }catch (e){
      return next(e);
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  // eslint-disable-next-line no-unused-vars
  static async register(req, res, next) {
    try {      
      let { username, name, email, password } = req.body;
      const user = await model.user.findFirst({
        where: { email: email },
      });
  
      if (user) {
        return res.status(400).json({ error: "Email already exist" });
      }
  
      const createUser = await model.user.create({
        data: {
          username: username,
          name: name,
          email: email,
          password: new Hash().make(password),
        },
      });
      return res.json({ createUser });
    } catch (error) {
      return next(error);
    }
  }
}
