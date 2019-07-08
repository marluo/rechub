const Joi = require("@hapi/joi");

const validateUser = user => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .label("valid email plz")
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    role: Joi.any()
      .valid("worker", "recruiter")
      .label("Only worker or recruiter is valid")
      .required(),
    firstName: Joi.string()
      .regex(/^[a-zA-Z]{3,30}$/)
      .label("Only latin characters are allowed"),
    lastName: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .label("Only latin characters are allowed"),
    username: Joi.string()
      .regex(/^[a-zA-Z0-9]{5,16}$/)
      .label(
        "Username must be between 5-16 characters and no special characters"
      )
      .required()
  });

  //vilket objekt som ska valideras, vilket schema, och abortEarly: false för säkerhetskull
  return Joi.validate(user, schema, { abortEarly: false });
};

module.exports = validateUser;
