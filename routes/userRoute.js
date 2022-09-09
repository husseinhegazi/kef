const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router
  .route("/user/signup")
  .post(userController.confirmPassword, userController.createNewUser);
router.route("/users").get(userController.getAllUsers);
router.route("/user/:id").get(userController.getUserById);
module.exports = router;
