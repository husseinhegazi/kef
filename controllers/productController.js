const  Product  = require("../models/productsSchema");

module.exports.addNewProduct = (req, res, next) => {
   
      let ProductObj = new Product({
        name:req.body.name,
        category:req.body.category,
        gender:req.body.gender,
        sale:req.body.sale,
        salePrice:req.body.salePrice,
        price:req.body.price
      });
      ProductObj.save()
        .then((product) => {
          res.status(201).json({ product });
        })
        .catch((error) => {
          next(error);
        });
    
  };