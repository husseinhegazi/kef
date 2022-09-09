const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router
  .route("/admin")
  .get((req, res, next) => {
    next();
  }, adminController.getAdmin)
  .post(adminController.addAdmin);

module.exports = router;
