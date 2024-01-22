
const mongoose  = require("mongoose");


const {Schema}=mongoose;

const order =new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    restrauntName:{
        type:String
    },
    order_data:{
        type:Array,
        required:true
    }
});
module.exports=mongoose.model('orderData',order);