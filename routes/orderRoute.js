const express = require("express");
const router = express.Router();
const mwError = require("../MW/validationMW");
const orderController = require("../controllers/orderController");
// const authMW = require("../MW/authMW");
// const {
//   addAdminValidation,
//   updateAdminValidation,
// } = require("../validations/adminValidation");

router.route("/order")
.post(orderController.addOrder)
.get();

router
  .route("/order/:id")
  .get()
  .put()
  .delete();

module.exports = router;
