const router = require('express').Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const { route } = require('./users');

// REGISTER
router.post('/register', async (req, res) => {
    try {
        // Generate password by bcrypt library
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new User
        const newUser = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword,
        });

        // Save the new User and reponse
        const user = await newUser.save();
        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
            return res.status(400).json({ error: 'Wrong password' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});
module.exports = router;
