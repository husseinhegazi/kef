const express = require("express");
const router = express.Router();
const mwError = require("../MW/validationMW");
const authMW = require("../MW/authMW");
const productInfoController=require("../controllers/productInfoController")
router.route("/product-info")
.get()
.post(productInfoController.addProductInfo)


module.exports = router;
