const express = require("express");
const router = express.Router();
const mwError = require("../MW/validationMW");
const authMW = require("../MW/authMW");
const productController=require("../controllers/productController")

router.route("/product")
.get()
.post(productController.addNewProduct)


module.exports = router;
