const express = require('express');
const order = require('../Modals/order');
const router = express.Router();
const razorpay=require('../Modals/razorapy')

router.post('/orderData', async (req, res) => {

   
   console.log(req.body.total)

    const options = {
        amount: req.body.total,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    };
    razorpay.orders.create(options, async (err, payResponse)=> {
        if (err) {
            res.send("Error Occured During Payment", err)
            return;
        }
        // res.send(order);
        if(payResponse.status==="created"){

    

    let data = req.body.order_data;
    await data.splice(0, 0, { order_date: req.body.order_date });  // Merging the two data coming from the frontend

    let userEmail = await order.findOne({ "email": req.body.email });
    // console.log("backend", req.body.email, userEmail);
    if (userEmail === null) {

        try {
            await order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            res.send("Server Error ", error.message);
        }
    }
    else {
        try {
            await order.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: [data] } }).then(() => {
                    res.json({ sucess: true })
                })
        } catch (error) {
            res.send("Server Error", error.message)
        }
    }
}
});
})

router.post('/myorderData', async (req, res) => {
    try {
        let myData = await order.findOne({ 'email': req.body.email });
        res.json({ orderData: myData });
    } catch (error) {
        res.send("Server Error", error.message);
    }
})


module.exports = router;