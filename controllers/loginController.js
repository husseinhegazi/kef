const User = require("../models/userSchema");
const Admin = require("../models/adminSchema");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");
// const { cookie } = require("express-validator");
const adminUserName = "kef@kef.com";
const adminPassword = "123456@kK";
module.exports.login = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  })

    .then((data) => {
      //   console.log("data is ==========>", data);
      if (data) {
        bycrypt.compare(req.body.password, data.password).then((isEqual) => {
          if (!isEqual) {
            res.status(401).json({ data: "invalid email or password" });
          } else {
            // console.log("role",data.role)
            let token = jwt.sign(
              {
                id: data._id,
                role: data.role,
              },
              process.env.secret,
              { expiresIn: "1d" }
            );
            // console.log(data._id)
            res
              .cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "protected",
              })
              .status(200)
              .json({ data, token });
            // console.log("login", cookie("access_token",token))
          }
        });
      } else {
        Admin.findOne({ email: req.body.email })
          .then((data) => {
            if (data) {
              console.log("data admin",data)
              bycrypt
                .compare(req.body.password, data.password)
                .then((isEqual) => {
                  if (!isEqual) {
                    res.status(401).json({ data: "invalid email or password" });
                  } else {
                    // console.log("role",data.role)
                    let token = jwt.sign(
                      {
                        id: data._id,
                        role: data.role,
                      },
                      process.env.secret,
                      { expiresIn: "1d" }
                    );
                    // console.log(data._id)
                    res
                      .cookie("access_token", token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "protected",
                      })
                      .status(200)
                      .json({ data, token });
                    // console.log("login", cookie("access_token",token))
                  }
                });
            } else {
              console.log("admin data",data)
              if (
                req.body.email === adminUserName &&
                req.body.password === adminPassword
              ) {
                let token = jwt.sign(
                  {
                    role: "admin",
                  },
                  process.env.secret,
                  { expiresIn: "1h" }
                );
                res
                  .cookie("access_token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "protected",
                  })
                  .status(200)
                  .json({ data, token });
              }else{res.status(401).json({ data: "invalid email or password" })}
            }
          })
          .catch((error) => next(error));
      }
    })
    .catch((error) => next(error));
};
