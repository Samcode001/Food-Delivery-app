const express=require('express');
const Order = require('../Modals/Orders');
const router=express.Router();

router.post('/orderData',async(req,res)=>{  // Now after direction through the express in here we are describing waht will happen in this endpoint


    let data=req.body.order_data;
    await data.splice(0,0,{order_date:req.body.order_date}) 


    // If the user is new that its his first order then we have to create new data
    let userEmailId=await Order.findOne({"email":req.body.email})
    console.log(userEmailId);
    if(userEmailId===null){

        try {
            await Order.create({
                email:req.body.email,
                order_data:[data]  
            }).then(()=>{
                res.json({success:true})
            })
        } catch (error) {
            console.log(error.message);
            res.send("Server Error ",error.message);
        }
    } 
    else{ // If the user is updating that means he order the panner tikka 3 days before then by now from todays order alos be added with the previous data
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                {$push:{order_data:data}}).then(()=>{ // In her we are pushing the data beacouse if just update the data then it will remove the previous order of paneer tikka and just add the todays order only
                    res.json({success:true})
                })
        } catch (error) {
            res.send("Server Error",error.message)
        }
    }
})

// router.post('/orderData', async (req, res) => {
//     let data = req.body.order_data
//     await data.splice(0,0,{Order_date:req.body.order_date})
//     console.log("1231242343242354",req.body.email)

//     //if email not exisitng in db then create: else: InsertMany()
//     let eId = await Order.findOne({ 'email': req.body.email })    
//     console.log(eId)
//     if (eId===null) {
//         try {
//             console.log(data)
//             console.log("1231242343242354",req.body.email)
//             await Order.create({
//                 email: req.body.email,
//                 order_data:[data]
//             }).then(() => {
//                 res.json({ success: true })
//             })
//         } catch (error) {
//             console.log(error.message)
//             res.send("Server Error", error.message)

//         }
//     }

//     else {
//         try {
//             await Order.findOneAndUpdate({email:req.body.email},
//                 { $push:{order_data: data} }).then(() => {
//                     res.json({ success: true })
//                 })
//         } catch (error) {
//             console.log(error.message)
//             res.send("Server Error", error.message)
//         }
//     }
// })
module.exports=router;