import { createError } from "../error.js";
import UserModel from "../models/UserModel.js";

//update user
export const updateUser = async (req, res, next) => {
   if (req.params.id === req.user.id) {
      try {
         const updateUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
         );
         const { password, ...other } = updateUser._doc;
         res.status(200).json(other);
      } catch (error) {
         next(error);
      }
   } else {
      next(createError(403, "you update only your account"));
   }
};

//delete user
export const deleteUser = async (req, res, next) => {
   if (req.params.id === req.user.id) {
      try {
         await UserModel.findByIdAndDelete(req.params.id);
         res.status(200).json("user has been deleted");
      } catch (error) {
         next(error);
      }
   } else {
      next(createError(403, "you delete only your account"));
   }
};
