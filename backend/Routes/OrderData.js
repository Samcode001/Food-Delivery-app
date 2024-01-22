const express = require("express");
const order = require("../Modals/order");
const restrauntOrders = require("../Modals/restrauntOrders");
const User = require("../Modals/User");
const router = express.Router();

router.post("/orderData", async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, {
    order_date: req.body.order_date,
    restraunt: req.body.restrauntName,
  }); // Merging the two data coming from the frontend

  const user = await User.findOne({ email: req.body.email });

  const newOrder = new restrauntOrders({
    name: user.name,
    restrauntName: req.body.restrauntName,
    orderData: req.body.order_data,
    orderDate: req.body.order_date,
  });

  await newOrder.save();
  let userEmail = await order.findOne({ email: req.body.email });
  // console.log("backend", req.body.email, userEmail);
  if (userEmail === null) {
    try {
      await order
        .create({
          email: req.body.email,
          order_data: [data],
        })
        .then(() => {
          res.json({ success: true });
        });
    } catch (error) {
      res.send("Server Error ", error.message);
    }
  } else {
    try {
      await order
        .findOneAndUpdate(
          { email: req.body.email },
          { $push: { order_data: [data] } }
        )
        .then(() => {
          res.json({ sucess: true });
        });
    } catch (error) {
      res.send("Server Error", error.message);
    }
  }

  // const options = {
  //   amount: req.body.total, // amount in the smallest currency unit
  //   currency: "INR",
  //   receipt: "order_rcptid_11",
  // };
  // razorpay.orders.create(options, async (err, payResponse) => {
  //   if (err) {
  //     res.send("Error Occured During Payment", err);
  //     return;
  //   }
  //   // res.send(order);
  //   if (payResponse.status === "created") {
  //     // let data = req.body.order_data;
  //     // await data.splice(0, 0, { order_date: req.body.order_date }); // Merging the two data coming from the frontend

  //     // let userEmail = await order.findOne({ email: req.body.email });
  //     // // console.log("backend", req.body.email, userEmail);
  //     // if (userEmail === null) {
  //     //   try {
  //     //     await order
  //     //       .create({
  //     //         email: req.body.email,
  //     //         order_data: [data],
  //     //       })
  //     //       .then(() => {
  //     //         res.json({ success: true });
  //     //       });
  //     //   } catch (error) {
  //     //     res.send("Server Error ", error.message);
  //     //   }
  //     // } else {
  //     //   try {
  //     //     await order
  //     //       .findOneAndUpdate(
  //     //         { email: req.body.email },
  //     //         { $push: { order_data: [data] } }
  //     //       )
  //     //       .then(() => {
  //     //         res.json({ sucess: true });
  //     //       });
  //     //   } catch (error) {
  //     //     res.send("Server Error", error.message);
  //     //   }
  //     // }
  //   }
  // });
});

router.post("/restrauntOrders", async (req, res) => {
  try {
    const { name } = req.body;

    const orders = await restrauntOrders.find({ restrauntName: name });
    res.status(200).json({ orders: orders });
  } catch (error) {
    res.status(500).send(`Error in Route:${error}`);
  }
});
router.post("/myorderData", async (req, res) => {
  try {
    console.log("first");
    let myData = await order.findOne({ email: req.body.email });
    res.json({ orderData: myData });
  } catch (error) {
    res.send("Server Error", error.message);
  }
});

module.exports = router;
