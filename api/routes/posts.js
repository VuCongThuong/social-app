const router = require('express').Router();
const Post = require('../models/Posts');
const User = require('../models/Users');

// Create post
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        return res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
});


// Update post
router.put('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    try {
        if (post.userId === req.body.userId) {
            await post.updateOne({$set: req.body});
            return res.status(200).json({success: "The post was updated successfully"});
        }else {
            return res.status(403).json({error: "You can only update your post"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
});


// Delete post
router.delete('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    try {
        if (post.userId === req.body.userId) {
            await post.deleteOne({$set: req.body});
            return res.status(200).json({success: "The post was deleted successfully"});
        }else {
            return res.status(403).json({error: "You can only delete your post"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// Like + Dislike post
router.put('/:id/like', async (req, res) => {
    const post = await Post.findById(req.params.id);
    try {
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({$push: { likes: req.body.userId}});
            return res.status(200).json({success: "The post has been liked"});
        }else {
            await post.updateOne({$pull: { likes: req.body.userId}});
            return res.status(200).json({success: "The post has been disliked"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get post by id
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get timeline posts
router.get('/timeline/all', async (req, res) => {
    try {

        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({userId: currentUser._id});
        const friendsPost = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({userId: friendId});
            })
        )
        return res.status(200).json(userPosts.concat(...friendsPost));
    } catch (error) {
        res.status(500).json(error);
    }
});



module.exports = router;
