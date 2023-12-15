const express = require("express");
const authenticateJwt = require("../auth/authenticateJwt");
const mongoose = require("mongoose");
// const { default: Food_items } = require("../../src/components/Food_items");
const router = express.Router();

const foodModel = mongoose.model(   // making the models to fetch the data from the collection of the mongoDb
  "food_items",
  new mongoose.Schema({}),
  "food_items"
);
const categoryModel = mongoose.model(
  "food_category",
  new mongoose.Schema({}),
  "food_category"
);

router.get("/fooditems", async (req, res) => {
  try {
    //     In Mongoose, the exec() method is used to execute a query and return a promise.
    const foodCategory = await categoryModel.find({}).exec();
    const foodItems = await foodModel.find({}).exec();

    if (foodCategory && foodItems)
      res
        .status(200)
        .json({ foodItems: foodItems, foodCategory: foodCategory });
    else res.status(404).send("Food Data not Found");
  } catch (error) {
    //     console.log(error);
    res.status(500).send("Error in Route");
  }
});

module.exports = router;
