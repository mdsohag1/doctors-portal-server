import mongoose from "mongoose";
import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { createError } from "./../error.js";
import jwt from "jsonwebtoken";

//sign up
export const signup = async (req, res, next) => {
   try {
      const salt = bcrypt.genSaltSync(10);
      const hasPass = bcrypt.hashSync(req.body.password, salt);
      const newUser = new UserModel({ ...req.body, password: hasPass });
      await newUser.save();
      res.status(200).json("user created successfully");
   } catch (error) {
      next(error);
   }
};

//signin
export const signin = async (req, res, next) => {
   try {
      const user = await UserModel.findOne({ email: req.body.email });
      if (!user) return next(createError(404, "user not found!"));
      const isCorrect = await bcrypt.compare(req.body.password, user.password);
      if (!isCorrect) return next(createError(400, "wrong creadsintial!"));
      const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
         expiresIn: "1h",
      });

      const { password, ...other } = user._doc;

      res.cookie("token", token, {
         httpOnly: true,
         // secure: process.env.NODE_ENV === "production",
      });
      res.status(200).json(other);
   } catch (error) {
      next(error);
   }
};
