import bcrypt from "bcryptjs";
import dotenv from "dotenv";

export class Hash {
  make(value) {
    dotenv.config();

    return bcrypt.hashSync(value, Number(process.env.BCRYPT_SALT_ROUNDS));
  }
  check(value, hashedValue) {
    return bcrypt.compareSync(value, hashedValue);
  }
}
