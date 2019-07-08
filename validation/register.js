const validator = require("validator");

const validateRegister = body => {
  let errors = {};

  if (!validator.isEmail(body.email)) {
    errors.email = "Please enter a valid email";
  }
  if (validator.isEmpty(body.role)) {
    errors.role = "Role is empty";
  }

  if (validator.username(isEmpty)) {
    errors.username = "You must enter a username";
  }

  if (!validator.isLength(body.password, { min: 6, max: 20 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (validator.isEmpty(firstName)) {
    errors.firstName = "You must enter a first name";
  }
  if (validator.isEmpty(firstName)) {
    errors.lastName = "You must enter a last name";
  }

  return errors;
};

module.exports = validateRegister;
