const express = require("express");
const router = express.Router();
const mwError = require("../MW/validationMW");
const adminController = require("../controllers/adminController");
const { addAdminValidation } = require("../validations/adminValidation");
router
  .route("/admin")
  .get(adminController.getAdmin)
  .post(
    addAdminValidation,
    mwError,
    adminController.confirmPassword,
    adminController.addAdmin
  );

router.route("/admin/:id").put(adminController.updateAdminById);
module.exports = router;
