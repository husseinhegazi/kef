const User = require("../models/userSchema");
const Admin = require("../models/adminSchema");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");
const adminUserName = "admin";
const adminPassword = "admin";
module.exports.login = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  })

    .then((data) => {
    //   console.log("data is ==========>", data);

      bycrypt.compare(req.body.password, data.password).then((isEqual) => {
        if (!isEqual) {
          res.status(401).json({ data: "invalid email or password" });
        } else {
            // console.log("role",data.role)
          let token = jwt.sign(
            {
              id: data._id,
              role:data.role
            },
            process.env.secret,
            { expiresIn: "1d" }
          );
          // console.log(data._id)
          res.status(200).json({ token, data});
          // console.log("login", res)
        }
      });
    })
    .catch((error) => next(error));
  //   else if (
  //     req.body.email == adminUserName &&
  //     req.body.password == adminPassword
  //   ) {
  //     let token = jwt.sign(
  //       {
  //         role: "admin",
  //       },
  //       process.env.secret,
  //       { expiresIn: "1d" }
  //     );
  //     res.status(200).json({ token });
  //   } else {
  //     throw new Error("role not found");
  //   }
};
