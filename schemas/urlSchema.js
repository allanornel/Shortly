import joi from "joi";

export async function postUrlShortenSchema(req, res, next) {
  const urlSchema = joi.object({
    url: joi.string().required(),
  });

  const { error } = urlSchema.validate(req.body, { abortEarly: false });
  if (error)
    return res.status(422).send(error.details.map((detail) => detail.message));

  next();
}
