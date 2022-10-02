const multer = require("multer");
const upload = multer({
  limits: {
    fileSize: 10000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }
    cb(undefined, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "./avatars/images/");
    },
    filename: function (req, file, callback) {
      const newImageName = `${Date.now()}.jpg`;
      callback(null, newImageName);
    },
  }),
});