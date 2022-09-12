const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router
  .route("/admin")
  .get(adminController.getAdmin)
  .post(adminController.confirmPassword, adminController.addAdmin);

router.route("/admin/:id").put(adminController.updateAdminById);
module.exports = router;
