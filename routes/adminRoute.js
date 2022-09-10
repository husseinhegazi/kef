const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router
  .route("/admin")
  .get((req, res, next) => {
    next();
  }, adminController.getAdmin)
  .post(adminController.addAdmin);

router.route("/admin/:id").put(adminController.updateAdminById);
module.exports = router;
