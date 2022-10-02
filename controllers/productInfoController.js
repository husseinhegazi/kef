const ProductInfo = require("../models/productInfoSchema");

module.exports.addProductInfo = (req, res, next) => {
  let path = [];
  if (req.files) {
    for (i = 0; i < req.files.length; i++) {
      path.push(`http://localhost:8081/products/${req.files[i].filename}`);
    //   console.log("path",path)
    }
  } else {
    path = ["https://www.w3schools.com/howto/img_avatar.png"];
  }
  let ProductInfoObject = new ProductInfo({
    productId: req.body.productId,
    colors: req.body.colors,
    images: path,
    medium: req.body.medium,
    large: req.body.large,
    xlarge: req.body.xlarge,
  });
  ProductInfoObject.save()
    .then((productInfo) => {
      console.log(req.files);
      res.status(201).json({ productInfo });
    })
    .catch((error) => next(error));
};
