import dotenv from "dotenv";
import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";

export class Jwt {
  constructor() {
    dotenv.config();
    this.secret = process.env.JWT_SECRET;
    this.exp = process.env.JWT_EXP;
    this.algorithm = process.env.JWT_ALGORITHM;
  }
  sign(user) {
    return jwt.sign(
      {
        username: user.username,
      },
      this.secret,
      {
        algorithm: this.algorithm,
        expiresIn: this.exp,
      }
    );
  }
  verify(token) {
    return jwt.verify(token, this.secret, {
      algorithms: [this.algorithm],
    });
  }

  middleware() {
    return expressjwt({
      secret: this.secret,
      algorithm: this.algorithm,
      isRevoked: (req, token) => {

      }
    });
  }
}
