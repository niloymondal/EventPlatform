import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// Register
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "User exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  const token = generateToken(user._id);

  // Set token in HttpOnly cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // only HTTPS in production
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.json({
    message: "User registered successfully",
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
  });
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = generateToken(user._id);

  // Set token in HttpOnly cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    message: "Login successful",
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
  });
};
