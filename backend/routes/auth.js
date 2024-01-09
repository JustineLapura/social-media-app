const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const router = express.Router();

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// Register user
router.post("/register", async (req, res) => {
  const { username, password, confirmPassword, email } = req.body;

  let emptyFields = [];

  if (!username) {
    emptyFields.push("username");
  }
  if (!email) {
    emptyFields.push("email");
  }
  if (!password) {
    emptyFields.push("password");
  }
  if (!confirmPassword) {
    emptyFields.push("confirmPassword");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "You must fill in all the fields", emptyFields });
  }

  // Check if password and confirmPassword match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  const usernameExists = await User.findOne({ username });
  const emailExists = await User.findOne({ email });

  // check username duplicate
  if (usernameExists) {
    return res.status(400).json({ error: "Username already in use" });
  }
  // email validation
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Email is not valid" });
  }
  // email validation
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ error: "Password not strong enough" });
  }
  // check email duplicate
  if (emailExists) {
    return res.status(400).json({ error: "Email already in use" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      password: hashedPassword,
      email,
    });

    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: "Failed to create user. Please try again" });
  }
});


// // Register user
// router.post("/register", async (req, res) => {
//   const { username, password, email } = req.body;

//   let emptyFields = [];

//   if (!username) {
//     emptyFields.push("username");
//   }
//   if (!email) {
//     emptyFields.push("email");
//   }
//   if (!password) {
//     emptyFields.push("password");
//   }
//   if (emptyFields.length > 0) {
//     return res
//       .status(400)
//       .json({ error: "You must fill in all the fields", emptyFields });
//   }

//   const usernameExists = await User.findOne({ username });
//   const emailExists = await User.findOne({ email });

//   // check username duplicate
//   if (usernameExists) {
//     return res.status(400).json({ error: "Username already in use" });
//   }
//   // email validation
//   if (!validator.isEmail(email)) {
//     return res.status(400).json({ error: "Email is not valid" });
//   }
//   // email validation
//   if (!validator.isStrongPassword(password)) {
//     return res.status(400).json({ error: "Password not strong enough" });
//   }
//   // check email duplicate
//   if (emailExists) {
//     return res.status(400).json({ error: "Email already in use" });
//   }
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const user = await User.create({
//       username,
//       password: hashedPassword,
//       email,
//     });

//     const token = createToken(user._id);
//     res.status(200).json({ user, token });
//   } catch (error) {
//     console.log(error.message);
//     res.status(400).json({ error: "Failed to create user. Please try again" });
//   }
// });

// Login an existing user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let emptyFields = [];

  if (!email) {
    emptyFields.push("email");
  }
  if (!password) {
    emptyFields.push("password");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "You must fill in all the fields", emptyFields });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Incorrect email." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log(password, user.password);
      return res.status(400).json({ error: "Incorrect password" });
    }

    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: "Failed to login user" });
  }
});

module.exports = router;
