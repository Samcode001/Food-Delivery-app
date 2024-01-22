const express = require("express");
const authenticateJwt = require("../auth/authenticateJwt");
const mongoose = require("mongoose");
const router = express.Router();

// A dictionary to store created models
const models = {};

router.post("/fooditems", async (req, res) => {
  try {
    const { categoryName, dataName } = req.body;

    // Validate that the model names are not empty
    if (!categoryName || !dataName) {
      return res.status(400).send("Invalid model names");
    }

    // Create or reuse models based on the provided names
    const foodModel = getModel(dataName);
    const categoryModel = getModel(categoryName);

    // Fetch data from the collections
    const foodCategory = await categoryModel.find({}).exec();
    const foodItems = await foodModel.find({}).exec();

    if (foodCategory && foodItems)
      res.status(200).json({ foodItems, foodCategory });
    else
      res.status(404).send("Food Data not Found");
  } catch (error) {
    res.status(500).send(`Error in Route: ${error}`);
  }
});

// Function to create or reuse models
function getModel(modelName) {
  if (!models[modelName]) {
    models[modelName] = mongoose.model(modelName, new mongoose.Schema({}), modelName);
  }
  return models[modelName];
}

module.exports = router;
