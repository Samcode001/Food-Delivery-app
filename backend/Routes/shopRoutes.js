const express = require("express");
const User = require("../Modals/User");
const router = express.Router();
// const { body, validationResult } = require("express-validator");
const { z } = require("zod");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticateJwt = require("../auth/authenticateJwt");
const generateToken = require("../auth/genreateToken");
const shops = require("../Modals/shops");
require("dotenv").config();
const jwtSecretString = process.env.jwtSecretString;

const jwtSecret = `${jwtSecretString}`;

// let userInputProps = z.object({
//   name: z.string().min(2).max(50),
//   email: z.string().min(10).max(60),
//   password: z.string().min(8).max(40),
//   location: z.string(),
// });

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, location } = req.body;

    const user = await shops.findOne({ email });
    if (user) res.status(401).json({ message: "User already Exist" });
    else {
      const newUser = new shops({
        name: name,
        email: email,
        password: password,
        location: location,
      });

      await newUser.save();
      res
        .status(200)
        .json({ message: "User Created", token: generateToken(newUser._id) });
    }
  } catch (error) {
    res.status(500).send("Error in Route");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await shops.findOne({ email });
    console.log(user._id);
    if (!user)
      res.status(401).json({ message: "Shop Didn't Found", flag: true });
    else {
      const validPass = password === user.password; // if pass mathces return true
      if (validPass)
        res
          .status(200)
          .json({
            message: "Logged in",
            token: generateToken(user._id),
            user: user,
          });
      else res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).send("Error in Route");
  }
});

router.get("/me", authenticateJwt, async (req, res) => {
  res.status(200).send("User Available");
});

module.exports = router;
