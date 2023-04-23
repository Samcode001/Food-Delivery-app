const express=require('express');
const router=express.Router();

router.post('/fooditems',(req,res)=>{
    try {
        // console.log(global.food_items);
        res.send([global.food_items,global.foodCategory]);
    } catch (error) {
        console.log(error);
        res.send("Server Not Found");
    }
})

module.exports=router;