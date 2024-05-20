import { Jwt } from "../../supports/Jwt.js";

// validate the JWT token by manual means
const validateTokenManual =
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   * @returns
   */
  (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ message: "token not available" });
    }

    const bearers = token.split(" ");
    console.log(bearers, token);

    try {
      const decode = new Jwt().verify(bearers[1]);
      req.user = decode;
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "token not valid" });
    }
  };

//validating JWT tokens using express-jwt library
const validateToken = new Jwt().middleware();

export { validateToken, validateTokenManual };
