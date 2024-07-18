import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(errorHandler(401, "User already exists with the email"));
  }
  const hashedpassword = await bcryptjs.hash(password, 12);
  const newUser = User({ username, email, password: hashedpassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong credentials"));
    }
    const { password: pass, ...rest } = validUser._doc;
    const token = jwt.sign(
      { id: validUser._id, email: validUser.email },
      process.env.JWT_SECRET
    );
    let expiryDate = new Date(Date.now() + 60 * 60 * 3000);
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET
      );
      const { password: pass, ...rest } = user._doc;
      let expiryDate = new Date(Date.now() + 60 * 60 * 3000);
      res
        .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedpassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username: req.body.name,
        email: req.body.email,
        password: hashedpassword,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, email: newUser.email },
        process.env.JWT_SECRET
      );
      const { password: pass, ...rest } = user._doc;
      let expiryDate = new Date(Date.now() + 60 * 60 * 3000);
      res
        .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);
    }
  } catch (error) {}
};
export const signout = (req, res) => {
  res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Signout successfully" });
};
