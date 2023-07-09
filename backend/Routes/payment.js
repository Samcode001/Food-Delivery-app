
const razorpay = require('../Modals/razorapy');
const express = require('express');
const router = express.Router();

// Create a payment order

router.post('/payment',  (req, res) => {



  // const options = {
  //   amount: 50000,  // amount in the smallest currency unit
  //   currency: "INR",
  //   receipt: "order_rcptid_11"
  // };
  // razorpay.orders.create(options, function (err, order) {
  //   if (err) {
  //     res.send("Error Occured During Payment", err)
  //     return;
  //   }
  //   res.send(order);
  // });
  razorpay.orders.all(option);

})

module.exports=router