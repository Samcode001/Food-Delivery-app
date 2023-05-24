const express = require('express');
const User = require('../Modals/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const jwtSecret = "Helloimsamnicetomeetyou";

router.post("/createUser", [
    body("name"),
    body("email", 'Please provide a valid email').isEmail(),
    body("password", "Password must be 8 chracters long").isLength({ min: 5 }),
    body("location")
], async (req, res) => {


    const salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(req.body.password, salt);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(
            { errors: errors.array() }
        )
    }

    try {


        let email = req.body.email;
        let userData = await User.findOne({ email });
        if (userData) {
            return res.status(409).json({ error: "User already exist" });
        }

        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword,
            location: req.body.location
        })

        res.json({ sucess: "true" });
    } catch (error) {
        res.json({ sucess: "false" });
        console.log(error);
    }
})

router.post("/loginUser", [
    body("email", "Please provide a valid email").isEmail(),
    body("password", "Password must be 8 chars long").isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    try {
        let email = req.body.email;
        const userData = await User.findOne({ email });

        const passwordCompare = await bcrypt.compare(req.body.password, userData.password)
        if (!userData || !passwordCompare) {
            return res.status(400).json({
                error: "Username or password is Invalid"
            })
        }

        const data = {
            user: {
                id: userData.id
            }
        }
        const authToken = jwt.sign(data, jwtSecret);
        return res.json({ success: true, authToken: authToken });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})

module.exports = router;