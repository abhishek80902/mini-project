const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= SIGNUP =================
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // validation
    if (!username || !email || !password) {
      return res.status(400).json("All fields are required");
    }

    // normalize input
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // check existing user
    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(400).json("User already exists");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(cleanPassword, 10);

    const user = await User.create({
      username,
      email: cleanEmail,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User created successfully",
      user
    });

  } catch (err) {
    console.log("Signup Error:", err);
    res.status(500).json("Server error");
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json("All fields are required");
    }

    // normalize input
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(400).json("Invalid email or password");
    }

    // debug logs (you can remove later)
    console.log("Entered password:", cleanPassword);
    console.log("Stored hash:", user.password);

    const isMatch = await bcrypt.compare(cleanPassword, user.password);

    console.log("Match result:", isMatch);

    if (!isMatch) {
      return res.status(400).json("Invalid email or password");
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user
    });

  } catch (err) {
    console.log("Login Error:", err);
    res.status(500).json("Server error");
  }
};