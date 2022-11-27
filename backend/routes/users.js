const router = require("express").Router();
const Pin = require("../models/User");
const bcrypt = require('bcrypt');
const User = require("../models/User");

// sign up

router.post('/signup', async (req, res) => {
    try {

        const salt = await bcrypt.genSalt(10);
        const hashPwd = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPwd
        });

        const user = await newUser.save();
        res.status(200).json(user._id);

    }
    catch (err) {
    }
});

router.post('/signin', async (req, res) => {

    try {
        const user = await User.findOne({username: req.body.username})
        !user && res.status(400).json("Invalid Credentials");

        const validPwd = await bcrypt.compare(
            req.body.password,
            user.password
        )

        !validPwd && res.status(400).json("Invalid credentials");

        res.status(200).json({_id : user._id, username: user.username});
    }
    catch (err) {
    }

})



module.exports = router;