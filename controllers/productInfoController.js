const ProductInfo = require("../models/productInfoSchema");
const Product = require("../models/productsSchema");

//find all product info
module.exports.getAllProductInfo = (req, res, next) => {
  ProductInfo.find({})
    .then((productInfo) => {
      res.status(200).json(productInfo);
    })
    .catch((error) => {
      next(error);
    });
};

//find one product info by id
module.exports.getProductInfoById = (req, res, next) => {
  ProductInfo.findOne({ _id: req.params.id })
    .then((productInfo) => {
      if (productInfo) {
        res.status(200).json(productInfo);
      } else {
        throw new Error("product info not found");
      }
    })
    .catch((error) => {
      next(error);
    });
};

// add product info
module.exports.addProductInfo = (req, res, next) => {
  let path = [];
  if (req.files) {
    for (i = 0; i < req.files.length; i++) {
      path.push(`http://localhost:8081/products/${req.files[i].filename}`);
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
      Product.findOne({ _id: productInfo.productId })
        .then((product) => {
          if (product) {
            if (!product.productInfoId.includes(productInfo._id)) {
              product.productInfoId.push(productInfo._id);
              return product
                .save()
                .then(res.status(200).json({ product, productInfo }));
            } else {
              next(new Error("product info id is already added"));
            }
          } else {
            next(new Error("product id is not found"));
          }
        })
        .catch((error) => {
          next(error);
        });
    })
    .catch((error) => next(error));
};

//update product info by id
module.exports.updateProductInfoById = (req, res, next) => {
  if (req.files) {
    ProductInfo.findOne({ _id: req.params.id })
      .then((productInfo) => {
        if (productInfo) {
          for (i = 0; i < req.files.length; i++) {
            productInfo.images.push(
              `http://localhost:8081/products/${req.files[i].filename}`
            );
          }
          return productInfo.save().then(res.status(200).json({ productInfo }));
        } else {
          throw new Error("product info not found");
        }
      })
      .catch((error) => {
        next(error);
      });
  } else {
    ProductInfo.updateOne({ _id: req.params.id }, { $set: req.body })
      .then((productInfo) => {
        if (req.body.productId) next(new Error("product id can't be updated"));
        else if (productInfo.modifiedCount === 0)
          next(new Error("product info dosent change or not found"));
        else res.status(200).json({ productInfo });
      })
      .catch((error) => {
        next(error);
      });
  }
};
