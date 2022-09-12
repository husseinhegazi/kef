const { body, param } = require("express-validator");
exports.addAdminValidation = [
  body("firstName")
    .notEmpty()
    .withMessage("first name is required")
    .isString()
    .withMessage("First name must be a string")
    .isLength({ max: 30, min: 2 }),
  body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isString()
    .withMessage("Last name must be a string")
    .isLength({ max: 30, min: 2 }),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("admin email must be a valid email")
    .isLength({ max: 40 })
    .withMessage("admin email must be smaller than 40 character"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string")
    .isStrongPassword({
      minLength: 8,
      minNumbers: 1,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password is too weak. Field must contain min. of 8 characters, 1 number , 1 lowercase and uppercase character and a symbol"
    ),
  body("phoneNumber")
    .notEmpty()
    .withMessage("phoneNumber is required")
    .isNumeric()
    .withMessage("phoneNumber must be a number")
    .isLength({ min: 10, max: 10 })
    .withMessage("phoneNumber must be 10 characters long"),
  body("wallet").optional().isNumeric().withMessage("wallet must be a number"),
];
