const { body, param, query, check } = require("express-validator");

const productInfo = require("../models/productInfoSchema");

exports.addProductInfoValidation = [
  body("colors").notEmpty().withMessage("color is required"),
  //   body("name")
  //     .notEmpty()
  //     .withMessage(" product name is required")
  //     .isString()
  //     .withMessage(" product name must be string")
  //     .isLength({ max: 30, min: 2 })
  //     .withMessage(
  //       "product name must be less than 30 characters long and min 2"
  //     ),
  body("medium")
    .optional()
    .isNumeric()
    .withMessage(" medium size must be a number")
    .isLength({ max: 5, min: 1 })
    .withMessage("medium size must be less than 5 numbers long and min 1"),
  body("large")
    .optional()
    .isNumeric()
    .withMessage(" large size must be a number")
    .isLength({ max: 5, min: 1 })
    .withMessage("large size must be less than 5 numbers long and min 1"),
  body("xlarge")
    .optional()
    .isNumeric()
    .withMessage(" xlarge size must be a number")
    .isLength({ max: 5, min: 1 })
    .withMessage("xlarge size must be less than 5 numbers long and min 1"),
  //  body("images")
  //  .isArray()
];
