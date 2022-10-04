const Product = require("../models/productsSchema");

//get all products
module.exports.getAllProducts = (req, res, next) => {
  Product.find({})
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((error) => {
      next(error);
    });
};

//get product by id
module.exports.getProductById = (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .then((product) => {
      if (product) {
        res.status(200).json(product);
      } else {
        throw new Error("product not found");
      }
    })
    .catch((error) => {
      next(error);
    });
};

//add new product
module.exports.addNewProduct = (req, res, next) => {
  let ProductObj = new Product({
    name: req.body.name,
    category: req.body.category,
    gender: req.body.gender,
    sale: req.body.sale,
    salePrice: req.body.salePrice,
    price: req.body.price,
  });
  ProductObj.save()
    .then((product) => {
      res.status(201).json({ product });
    })
    .catch((error) => {
      next(error);
    });
};

//update product by id
module.exports.updateProductById=(req,res,next)=>{
  Product.updateOne({_id:req.body.id},{$set:req.body})
  .then((product)=>{
    if (product.modifiedCount === 0)
    next(new Error("product dosent change or not found"));
  else res.status(200).json({ product });
  })
  .catch((error)=>{next(error)})
}