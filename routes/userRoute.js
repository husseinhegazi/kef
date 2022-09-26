const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { addUserValidation } = require("../validations/userValidation");
const errorMW = require("../MW/validationMW");
const authMW = require("../MW/authMW");
router
  .route("/user/signup")
  .post(
    addUserValidation,
    userController.confirmPassword,
    errorMW,
    userController.createNewUser
  );
router.route("/users").get(authMW,(req, res, next) => {


    if (
      req.role == "user" 
    ) {
      // console.log("kitchen id", req.id);
      next();
    } else {
      let error = new Error("not authorized");
      error.status = 403;
      next(error);
    }
  },userController.getAllUsers);
router.route("/user/:id").get(userController.getUserById);
module.exports = router;
