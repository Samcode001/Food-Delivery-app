const mongoose = require("mongoose");

const { Schema } = mongoose;

const restrauntOrders = new Schema({
  name: {
    type: String,
  },
  restrauntName: {
    type: String,
  },
  orderData: {
    type: Array,
  },
  orderDate: {
    type: String,
  },
});
module.exports = mongoose.model("restrauntOrders", restrauntOrders);
