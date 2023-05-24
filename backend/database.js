const mongoose = require('mongoose');
require('dotenv').config();
const mongoString=process.env.mongoString;

const mongoDB= async()=>{
   // console.log(mongoString);
   await mongoose.connect(`${mongoString}`,{ useUnifiedTopology: true },{ useFindAndModify: false });
   console.log("connected");

   const fetched_food_data=await mongoose.connection.db.collection("food_items");

   fetched_food_data.find({}).toArray(async (err,foodData)=>{
           const fetched_category_data=await mongoose.connection.db.collection("food_category");
         fetched_category_data.find({}).toArray((err,categoryData)=>{
            if(err){
               console.log(err);
            }
            else{
               global.food_items=foodData;
               global.food_category=categoryData;
               // console.log(foodData,categoryData);
            }
         })  
})
}

mongoDB().catch(err=>{console.log(err)});

module.exports=mongoDB;

