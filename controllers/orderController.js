const Order = require("../models/orderSchema");
const ProductInfo = require("../models/productInfoSchema");

//get all orders

//get order by id

//add new order
module.exports.addOrder = (req, res, next) => {
  let OrderObj = new Order({
    user: req.body.user,
    city: req.body.city,
    street: req.body.street,
    buildingNumber: req.body.buildingNumber,
    floor: req.body.floor,
    apartment: req.body.apartment,
    notes: req.body.notes,
    products: req.body.products,
    productInfo: req.body.productInfo,
    totalPrice: req.body.totalPrice,
  });

  OrderObj.save()
    .then((order) => {
      let productInfoArr = req.body.productInfo;
      for (let i = 0; i < productInfoArr.length; i++) {
        ProductInfo.updateOne(
          { _id: req.body.productInfo[i].productInfoId },
          {
            $inc: { [productInfoArr[i].size]: -1 },
          }
        )
          .then((data) => {
            if (data.modifiedCount === 0)
              next(new Error("error in updating sizes"));
          })
          .catch((error) => {
            next(error);
          });
      }
      res.status(201).json({ order });
    })
    .catch((error) => {
      next(error);
    });
};

//update order

//delete order
