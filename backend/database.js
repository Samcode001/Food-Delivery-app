const mongoose = require('mongoose');

const mongoDB= async()=>{
   await mongoose.connect('mongodb://127.0.0.1:27017/foodiee',{ useUnifiedTopology: true },{ useFindAndModify: false });
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

// mongoDB().catch(err=>{console.log(err)});

module.exports=mongoDB;

