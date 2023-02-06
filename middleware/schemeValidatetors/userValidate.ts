import { REGEX_EMAIL, REGEX_PASSWORD, REGEX_PHONE, REGEX_USERNAME } from "../../constant/rexgex";

const Joi = require('joi');

exports.registerUser = (req, res, next) => {
    const schema = Joi.object({
      username: Joi.string()
        .min(3)
        .max(30)
        .insensitive()
        .invalid("login", "register", "profile")
        .pattern(new RegExp( REGEX_USERNAME ))
        .required(),
			phone: Joi.string()
			.min(10)
      .max(10)
			.pattern(new RegExp(REGEX_PHONE))
			.required(),
      email: Joi.string()
        .min(5)
        .max(30)
        .pattern(new RegExp(REGEX_EMAIL))
        .required(),
			password: Joi.string().min(3).max(30)
			.pattern(new RegExp(REGEX_PASSWORD))
			.required(),
    });
  
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    next();
  };