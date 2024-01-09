const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const router = express.Router();

// GET Users
router.get("/", async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json(users);
});

//   // GET a User
//   router.get("/user", async (req, res) => {
//     const userId = req.query.userId;
//     const username = req.query.username;

//     try {
//       if (!userId && !username) {
//         return res
//           .status(400)
//           .json({ message: "Please provide userId or username" });
//       }

//       let user;

//       if (userId) {
//         user = await User.findById(userId);
//       } else if (username) {
//         user = await User.findOne({ username: username });
//       }

//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       const { password, updatedAt, ...other } = user._doc;
//       res.status(200).json(other);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   });

// GET a User
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;

  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET a User by userId
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET a User by username
router.get("/username/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    res.status(200).json(user);
  } catch (error) {
    res.status(200).json(error);
  }
});


// GET a User
// router.get("/:id", async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ error: "no such user" });
//   }

//   try {
//     const user = await User.findById(id);
//     const { password, updatedAt, ...other } = user._doc;

//     if (!user) {
//       return res.status(404).json({ error: "User not found!" });
//     }

//     res.status(200).json(other);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// UPDATE a user
router.put("/:id", async (req, res) => {
  console.log(req.body.userId, req.body.desc);
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({ mssg: "Account has been updated", user });
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res
      .status(403)
      .json({ error: "You can only update your own account" });
  }
});

// DELETE a User
router.delete("/:id", async (req, res) => {
  //   const { userId, isAdmin } = req.body;
  //   const { id } = req.params;
  console.log(req.body.userId, req.params.id, req.body.isAdmin);
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ mssg: "Account has been deleted" });
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res
      .status(403)
      .json({ error: "You can only delete your own account" });
  }
});

// FOLLOW a user
router.put("/:id/follow", async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;

  if (userId !== id) {
    try {
      const user = await User.findById(id);
      const currentUser = await User.findById(userId);
      //   if (user && currentUser) {
      if (!user.followers.includes(userId)) {
        await user.updateOne({ $push: { followers: userId } });
        await currentUser.updateOne({ $push: { followings: id } });
        res.status(200).json({ mssg: "user has been followed" });
      } else {
        res.status(503).json({ error: "You already follow this user" });
      }
      //   }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json({ error: "You can't follow yourself" });
  }
});

// UNFOLLOW a user
router.put("/:id/unfollow", async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;

  if (userId !== id) {
    try {
      const user = await User.findById(id);
      const currentUser = await User.findById(userId);
      //   if (user && currentUser) {
      if (user.followers.includes(userId)) {
        await user.updateOne({ $pull: { followers: userId } });
        await currentUser.updateOne({ $pull: { followings: id } });
        res.status(200).json({ mssg: "user has been unfollowed" });
      } else {
        res.status(503).json({ error: "You don't follow this user" });
      }
      //   }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json({ error: "You can't unfollow yourself" });
  }
});

module.exports = router;
