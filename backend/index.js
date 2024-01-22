const express = require("express");
const mongoDB = require("./database");
const app = express();
const port = 5000;
const userRoutes = require("./Routes/CreateUser");
const shopRoutes = require("./Routes/shopRoutes");
const dataRoutes = require("./Routes/DisplayData");
const orderDataRoutes = require("./Routes/OrderData");
const paymentRoutes = require("./Routes/payment");
const mongoose = require("mongoose");
require("dotenv").config();
const mongoString = process.env.mongoString;
const cors = require("cors");
const Razorpay = require("razorpay");
const crypto = require("crypto");

// mongoDB();

// This is the function for CORS Policy when we make connection between frontend & backend then we need it to allow the data to flow
// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","*");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin,X-Requested-With,Content-Type,Accept"
//     );
//     next();//Middleware function
//   })

app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);
app.use("/shop", shopRoutes);
app.use("/api", dataRoutes);
app.use("/api", orderDataRoutes);
app.use("/api", paymentRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

mongoose
  .connect(
    process.env.mongoString,
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => console.log(`Error in MongoDb: ${error}`));

const instance = new Razorpay({
  key_id: process.env.razoarpay_api_id,
  key_secret: process.env.razorpay_api_key,
});

const checkout = async (req, res) => {
  var options = {
    amount: Number(req.body.amount * 100), // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };

  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
};

const paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // const body = razorpay_order_id + "|" + razorpay_payment_id;

    // const expectedSignature = crypto
    //   .createHmac("sha256", process.env.razorpay_api_key)
    //   .update(body.toString(), 'utf-8')
    //   .digest("hex");

    // const isAuthentic = expectedSignature === razorpay_signature;

    // if (isAuthentic) {
    //   // Database logic here
    // }
    res.redirect(
      `https://sam-foodiee-site.netlify.app/paymentsuccess?reference=${razorpay_payment_id}`
    );
    //  else {
    //   res.status(400).json({
    //     success: false,
    //   });
    // }
  } catch (error) {
    console.log(error);
  }
};

app.post("/checkout", checkout);
app.post("/paymentVerification", paymentVerification);

app.get("/getkey", (req, res) => {
  res.status(200).json({ key: process.env.razoarpay_api_id });
});
