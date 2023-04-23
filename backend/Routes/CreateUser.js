const express = require('express');
const router = express.Router();
const User = require('../Modals/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const jwtSecret="MynameisSamSolpleasetrytounderstand";




// Route for signUp
router.post("/createuser", [
    body('name').isLength({ min: 5 }),
    // username must be an email
    body('email', 'Please provide a valid email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Password must be 5 char or more').isLength({ min: 5 }),
    body('location')
]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);
        try {
            await User.create({
                name: req.body.name,
                password: securePassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    });

// Route for login
router.post("/loginuser", [
    // username must be an email
    body('email', 'Please provide a valid email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Password must be 5 char or more').isLength({ min: 5 })
]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            const passwordCompare=await bcrypt.compare(req.body.password,userData.password);
            if (!userData || !passwordCompare)
                return res.status(400).json({
                    errors: "Email or password is Invalid"
                })

                const data={
                    user:{
                        id:userData.id
                    }
                }
            let authToken=jwt.sign(data,jwtSecret);
            res.json({ success: true,authToken:authToken });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    });
module.exports = router;