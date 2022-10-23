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
.get(orderController.getAllOrders);

router
  .route("/order/:id")
  .get(orderController.getOrderById)
  .put()
  .delete();

module.exports = router;
