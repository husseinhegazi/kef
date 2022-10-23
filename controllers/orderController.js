const Order = require("../models/orderSchema");
const ProductInfo = require("../models/productInfoSchema");
const Product = require("../models/productsSchema");

//get all orders
module.exports.getAllOrders = (req, res, next) => {
  Order.find()
    .then((Order) => {
      res.status(200).json(Order);
    })
    .catch((error) => {
      next(error);
    });
};
//get order by id
(module.exports.getOrderById = (req, res, next) => {
  Order.findOne({ _id: req.params.id })
    .then((Order) => {
      if (Order) {
        res.status(200).json(Order);
      } else {
        throw new Error("Order not found");
      }
    })
    .catch((error) => {
      next(error);
    });
}),
  //add new order
  (module.exports.addOrder = (req, res, next) => {
    let productInfoArr = req.body.productInfo;
    let prices = 50;
    for (let i = 0; i < productInfoArr.length; i++) {
      prices += productInfoArr[i].price;
      // console.log(req.body.delivery)
    }
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
      totalPrice: prices,
      orderStatus: req.body.orderStatus,
      delivery: req.body.delivery,
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
  });

//update order

//delete order
