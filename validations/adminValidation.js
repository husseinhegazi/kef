const { body, param, query } = require("express-validator");

exports.addUserValidation = [
  body("firstName")
    .notEmpty()
    .withMessage(" user first name is required")
    .isString()
    .withMessage(" user first name must be string")
    .isLength({ max: 30, min: 2 })
    .withMessage(
      "user first name must be less than 50 characters long and min 2"
    ),
    body("lastName")
    .notEmpty()
    .withMessage(" user last name is required")
    .isString()
    .withMessage(" user last name must be string")
    .isLength({ max: 30, min: 2 })
    .withMessage(
      "user last name must be less than 50 characters long and min 2"
    ),
];
