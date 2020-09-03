import Joi from "@hapi/joi";

export const createSchema = Joi.object().keys({
  firstname: Joi.string()
    .regex(/^[A-Za-z]{3,}$/)
    .trim()
    .required(),
  lastname: Joi.string()
    .regex(/^[A-Za-z]{3,}$/)
    .trim()
    .required(),
  password: Joi.string()
    .required()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[0-9])/)
    .message(
      "password must contain at least 1 lowercase, and 1 number"
    ),
  username: Joi.string()
    .required()
    .trim()
    .lowercase(),
  gender: Joi.string().valid("M", "F").required(),
  date_of_birth: Joi.string()
    .regex(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/)
    .trim()
    .required(),
});

export const IdSchema = Joi.object({
  id: Joi.number().required(),
});

export const updateSchema = Joi.object().keys({
  id: Joi.number().required(),
  userId: Joi.number().required(),
  firstname: Joi.string()
    .regex(/^[A-Za-z]{3,}$/)
    .trim()
    .required(),
  lastname: Joi.string()
    .regex(/^[A-Za-z]{3,}$/)
    .trim()
    .required(),
  gender: Joi.string().valid("M", "F").required(),
  date_of_birth: Joi.string()
    .regex(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/)
    .trim()
    .required(),
});
