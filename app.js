const express = require("express");
const server = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const userRoute=require("./routes/userRoute");
const adminRoute=require("./routes/adminRoute");
const loginRoute=require("./routes/loginRoute");

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

// cors
server.use(cors({}));

//endpoints Routes
server.use([express.json(), express.urlencoded({ extended: false })]);

server.use([userRoute,adminRoute,loginRoute])
// not found middleWare
server.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});
//error middleWare
server.use((error, req, res, next) => {
  let status = error.status || 500;
  res.status(status).json({ message: "internal error " + error });
});
