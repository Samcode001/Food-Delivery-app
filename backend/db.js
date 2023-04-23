const mongoose = require('mongoose');

const mongoDB = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/gofoodmern',{ useNewUrlParser: true },{ useUnifiedTopology: true });
    console.log("Connected");

    const fetched_food= await mongoose.connection.db.collection("food_items");
    fetched_food.find({}).toArray( async (err,foodData)=>{
        const fetched_Category=await mongoose.connection.db.collection("food_category");
        fetched_Category.find({}).toArray((err,categoryData)=>{

            if(err)
            console.log(err);
            else{
                global.food_items=foodData;
                global.foodCategory=categoryData;
                // console.log(global.food_items);
            }
        })
        
    })

}
mongoDB().catch(err => console.log(err));



module.exports = mongoDB;