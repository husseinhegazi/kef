const mongoose = require("mongoose");
require("../models/adminSchema");
const Admin = mongoose.model("admin");
const bcrypt = require("bcrypt");
// confirm password for user
module.exports.confirmPassword=(req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
      let error = new Error('Passwords do not match.');
      error.status = 400;
      return next(error);
  }else{next()}
},
//find admin
module.exports.getAdmin = (req, res, next) => {
  Admin.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};
// add admin
module.exports.addAdmin = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hashpass) => {
    let adminObj = new Admin({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashpass,
      phoneNumber: req.body.phoneNumber,
      nationalId: req.body.nationalId,
    });
    adminObj
      .save()
      .then((data) => {
        console.log(data);
        res.status(201).json({ data: data });
      })
      .catch((error) => {
        next(error);
      });
  });
};

//update admin
module.exports.updateAdminById = (req, res, next) => {
  Admin.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  )
    .then((data) => {
      if (data.modifiedCount == 0) next(new Error("Admin not found"));
      else res.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};
