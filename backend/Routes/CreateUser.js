const express = require("express");
const User = require("../Modals/User");
const router = express.Router();
// const { body, validationResult } = require("express-validator");
const { z } = require("zod");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticateJwt = require("../auth/authenticateJwt");
const generateToken = require("../auth/genreateToken");
require("dotenv").config();
const jwtSecretString = process.env.jwtSecretString;

const jwtSecret = `${jwtSecretString}`;

// router.post("/createUser", [
//     body("name"),
//     body("email", 'Please provide a valid email').isEmail(),
//     body("password", "Password must be 8 chracters long").isLength({ min: 5 }),
//     body("location")
// ], async (req, res) => {

//     const salt = await bcrypt.genSalt(10);
//     let securePassword = await bcrypt.hash(req.body.password, salt);

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json(
//             { errors: errors.array() }
//         )
//     }

//     try {

//         let email = req.body.email;
//         let userData = await User.findOne({ email });
//         if (userData) {
//             return res.status(409).json({ error: "User already exist" });
//         }

//         await User.create({
//             name: req.body.name,
//             email: req.body.email,
//             password: securePassword,
//             location: req.body.location
//         })

//         res.json({ sucess: "true" });
//     } catch (error) {
//         res.json({ sucess: "false" });
//         console.log(error);
//     }
// })

// router.post("/loginUser", [
//     body("email", "Please provide a valid email").isEmail(),
//     body("password", "Password must be 8 chars long").isLength({ min: 5 })
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({
//             errors: errors.array()
//         })
//     }
//     try {
//         let email = req.body.email;
//         const userData = await User.findOne({ email });

//         const passwordCompare = await bcrypt.compare(req.body.password, userData.password)
//         if (!userData || !passwordCompare) {
//             return res.status(400).json({
//                 error: "Username or password is Invalid"
//             })
//         }

//         const data = {
//             user: {
//                 id: userData.id
//             }
//         }
//         const authToken = jwt.sign(data, jwtSecret);
//         return res.json({ success: true, authToken: authToken });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false });
//     }
// })


let userInputProps = z.object({
  name: z.string().min(2).max(50),
  email: z.string().min(10).max(60),
  password: z.string().min(8).max(40),
  location: z.string(),
});

router.post("/signup", async (req, res) => {
  try {
    const parsedInput = userInputProps.safeParse(req.body);

    if (!parsedInput.success) {
      return res
        .status(402)
        .json({
          message: `Please Input valid Arguments: ${parsedInput.error}`
        });
    }

    const { name, email, password, location } = req.body;

    const salt = await bcrypt.genSalt(10);
    const securePass = await bcrypt.hash(password, salt);

    const user = await User.findOne({ email });
    if (user) res.status(401).json({ message: "User already Exist" });
    else {
      const newUser = new User({
        name: name,
        email: email,
        password: securePass,
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
    const user = await User.findOne({ email });
    console.log(user._id);
    if (!user)
      res.status(401).json({ message: "User Didn't Found", flag: true });
    else {
      const validPass = await bcrypt.compare(password, user.password); // if pass mathces return true
      if (validPass)
        res
          .status(200)
          .json({ message: "Logged in", token: generateToken(user._id) });
      else res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).send("Error in Route");
  }
});

router.get('/me',authenticateJwt,async(req,res)=>{
     res.status(200).send("User Available");
})

module.exports = router;
