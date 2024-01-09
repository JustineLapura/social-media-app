const express = require("express");
const Post = require("../models/postModel");
const User = require("../models/userModel");

const router = express.Router();

// GET Posts
router.get("/", async (req, res) => {
  const posts = await Post.find({}).sort({ createdAt: -1 });

  res.status(200).json(posts);
});

// GET a Post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json(error);
  }
});

// GET timeline posts
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    // console.log("User Posts: ", userPosts)
    // console.log("Friend Posts: ", friendPosts)
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {
    res.status(200).json(error);
  }
});

// GET all user's post
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (error) {
    res.status(200).json(error);
  }
}); 

// create post
router.post("/", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json(error);
  }
});

// UPDATE Posts
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json({ mssg: "Post has been updated" });
    } else {
      res.status(404).json({ error: "You can only update your own post" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

// DELETE Posts
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json({ mssg: "Post has been deleted" });
    } else {
      res.status(404).json({ error: "You can only delete your own post" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

// Like / dislike a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(400).json("Post has been disliked");
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
