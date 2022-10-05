const express = require("express");
const router = express.Router();
const mwError = require("../MW/validationMW");
const authMW = require("../MW/authMW");
const productController=require("../controllers/productController")
const { updateProductsValidation } = require("../validations/productsValidation");


router.route("/product")
.get(productController.getAllProducts)
.post(productController.addNewProduct)
.delete()
router.route("/product/:id")
.get(productController.getProductById)
.put(updateProductsValidation,mwError,productController.updateProductById)
.delete()

module.exports = router;
