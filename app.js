const express = require("express");
const server = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const loginRoute = require("./routes/loginRoute");
const resetPassword = require("./routes/resetPassword");
const product = require("./routes/productRoute");
const productInfo = require("./routes/productInfoRoutes");

// DB connect
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database Connected");
    server.listen(process.env.port || 8081, () => {
      console.log("Server 8081 is listening");
    });
  })
  .catch((error) => {
    console.log("DataBase connection error" + error);
  });
//morgan middleWare
server.use(
  morgan("dev", {
    skip: (req, res) => {
      res.statusCode < 400;
    },
  })
);
//images
const multer = require("multer");
const upload = multer({
  limits: {
    fileSize: 1000000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image of type jpg, jpeg or png"));
    } else if (req.files.length > 7) {
      return cb(new Error("maximum 7 photos can be uplouded"));
    } else {
      cb(undefined, true);
    }
  },
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "./products");
    },
    filename: function (req, file, callback) {
      const newImageName = `${Date.now()}-${file.originalname}`;
      callback(null, newImageName);
    },
  }),
});
// cors
server.use(cors({}));
server.use(cookieParser());

//endpoints Routes
server.use([
  express.json(),
  express.urlencoded({ extended: false }),
  upload.array("images"),
]);

server.use([
  userRoute,
  adminRoute,
  loginRoute,
  resetPassword,
  product,
  productInfo,
]);

server.use("/products", express.static(path.join(__dirname, "products")));
// not found middleWare
server.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});
//error middleWare
server.use((error, req, res, next) => {
  let status = error.status || 500;
  res.status(status).json({ message: "internal error " + error });
});
