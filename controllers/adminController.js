const mongoose = require("mongoose");
require("../models/adminSchema");
const Admin = mongoose.model("admin");
const bcrypt = require("bcrypt");

module.exports.getAdmin = (req, res, next) => {
  Admin.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};
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
module.exports.updateAdminById = (req, res, next) => {
  Admin.findOne({ _id: req.params.id })
    .then((data) => {
      let bodyData = req.body;
      for (let key in bodyData) {
        data[key] = bodyData[key];
      }
      return data.save().then(res.status(200).json({ data: "updated" }));
    })
    .catch((error) => {
      next(error);
    });
};
