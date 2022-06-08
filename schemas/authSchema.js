import joi from "joi";

export async function signUpSchema(req, res, next) {
  const { name, email, password, passwordConfirm } = req.body;

  const signUpBody = {
    name,
    email,
    password,
    passwordConfirm,
  };

  const registerSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    passwordConfirm: joi.ref("password"),
  });

  const { error } = registerSchema.validate(signUpBody, { abortEarly: false });
  if (error)
    return res.status(422).send(error.details.map((detail) => detail.message));

  next();
}

export async function singInSchema(req, res, next) {
  const { email, password } = req.body;

  const signUpBody = {
    email,
    password,
  };

  const registerSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  const { error } = registerSchema.validate(signUpBody, { abortEarly: false });
  if (error)
    return res.status(422).send(error.details.map((detail) => detail.message));

  next();
}
