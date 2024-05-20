import expressJoiValidation from "express-joi-validation";
import Joi from "joi";

export class UserValidator {
  static index = expressJoiValidation.createValidator().body(
    Joi.object({
      username: Joi.string(),
      email: Joi.string(),
      page: Joi.object({
        size: Joi.number(),
        number: Joi.number(),
      }),
    })
  );
}
