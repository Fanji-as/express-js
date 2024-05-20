import { model } from "../../../../models/index.js";

export class UserController {
  // eslint-disable-next-line no-unused-vars
  static async index(req, res, next) {
    let { username, email, provider } = req.query;

    const where = {};
    if (username) {
      where.username = username;
    }
    if (email) {
      where.email = email;
    }
    if (provider) {
      where.provider = provider;
    }

    const users = await model.user.findMany({
      skip: 5,
      take: 5,
    });
    return res.json(users);
  }
}
