const mongoose = require("mongoose");
require("../models/adminSchema");
const admin = mongoose.model("admin");
const bcrypt = require("bcrypt");

module.exports.getAdmin = (req, res, next) => {
  admin
    .find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};
module.exports.addAdmin = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hashpass) => {
    let adminObj = new admin({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashpass,
      phoneNumber: req.body.phoneNumber,
      wallet: req.body.wallet,
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
