import dotenv from "dotenv";
import jwt from "jsonwebtoken";

export class Jwt {
  constructor() {
    dotenv.config();
    this.secret = process.env.JWT_SECRET;
    this.exp = Number(process.env.JWT_EXP);
    this.algorithm = process.env.JWT_ALGORITHM;
  }
  sign(user) {
    return jwt.sign(
      {
        username: user.username,
        exp: Math.floor(Date.now() / 1000) + this.exp,
      },
      this.secret,
      {
        algorithm: this.algorithm,
      }
    );
  }
  verify(token) {
    return jwt.verify(token, this.secret, {
      algorithms: [this.algorithm],
    });
  }
}
