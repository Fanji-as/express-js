import expressJoiValidation from "express-joi-validation";
import Joi from "joi";

export class AuthValidator {
  static login = expressJoiValidation.createValidator().body(
    Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    })
  );

  static register = expressJoiValidation.createValidator().body(
    Joi.object({
      username: Joi.string().min(3).max(30).required(),
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
    })
  );
}
