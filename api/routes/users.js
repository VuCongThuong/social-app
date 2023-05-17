const User = require('../models/Users');
const router = require('express').Router();
const bcrypt = require('bcrypt');

// Update user
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id ) {
        // Update password
        if (req.body.password)
        {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (error) {
                return res.status(500).json(error)
            }
        }
        // Update info
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body});
            return res.status(200).json({success: "Account updated successfully"})
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        return res.status(403).json({error: 'You can update only your account'});
    }
});

// Delete user
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id ) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            return res.status(200).json({success: "Account deleted successfully"})
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        return res.status(403).json({error: 'You can delete only your account'});
    }
});

// Get user by id
router.get('/:id', async (req, res) => {
    if (req.params.id ) {
        try {
            const user = await User.findById(req.params.id);
            const {password, updatedAt, ...other} = user._doc;
            return res.status(200).json(other)
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        return res.status(403).json({error: 'userId is required'});
    }
});

// Follow user
router.put('/:id/follow', async (req, res) => {
    // Check self-follow
    if (req.body.userId !== req.params.id ) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            // Check not follow yet
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({$push: {followers: req.body.userId}});
                await currentUser.updateOne({$push: {followings: req.params.id}});
                return res.status(200).json({success: 'User has been follow'});
            } else {
                return res.status(403).json({error: 'You already follow this user'});
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        return res.status(403).json({error: 'You can\'t follow yourself'});
    }
});

// Unfollow user
router.put('/:id/unfollow', async (req, res) => {
    // Check self-follow
    if (req.body.userId !== req.params.id ) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            // Check not follow yet
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({$pull: {followers: req.body.userId}});
                await currentUser.updateOne({$pull: {followings: req.params.id}});
                return res.status(200).json({success: 'User has been unfollow'});
            } else {
                return res.status(403).json({error: 'You don\'t follow this user'});
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        return res.status(403).json({error: 'You can\'t unfollow yourself'});
    }
});
module.exports = router;
