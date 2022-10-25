import * as Joi from 'joi';

const loginValidation = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().min(6),
});

export default loginValidation;
