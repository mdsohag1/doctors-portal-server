import { createError } from "../error.js";
import UserModel from "../models/UserModel.js";
import AppointModel from "../models/AppointModel.js";

//create a AppointMent
export const addAppoint = async (req, res, next) => {
   const newAppoint = new AppointModel({ userId: req.user.id, ...req.body });
   try {
      const savedAppoint = await newAppoint.save();
      res.status(200).json(savedAppoint);
   } catch (error) {
      next(error);
   }
};

//update Apoint
export const updateAppoint = async (req, res, next) => {
   try {
      const appoint = await AppointModel.findById(req.params.id);
      if (!appoint) return next(createError(404, "video not found"));
      if (req.user.id === appoint.userId) {
         const updatedAppoint = await AppointModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
         );
         res.status(200).json(updatedAppoint);
      } else {
         return next(createError(403, "you can updated only your video"));
      }
   } catch (error) {
      next(error);
   }
};

//delete Apoint
export const deleteApoint = async (req, res, next) => {
   try {
      const appoint = await AppointModel.findById(req.params.id);
      if (!appoint) return next(createError(404, "appointment not found"));
      if (req.user.id === appoint.userId) {
         await AppointModel.findByIdAndDelete(req.params.id);
         res.status(200).json("apointment has been deleted successfully");
      } else {
         return next(createError(403, "you can delete only your apointmnent"));
      }
   } catch (error) {
      next(error);
   }
};

//get all apointment
export const getALlAppointment = async (req, res, next) => {
   try {
      const user = await UserModel.findById(req.user.id);
      const userId = user._id;
      const allAppoint = await AppointModel.find({ userId: userId });
      res.status(200).json(allAppoint);
   } catch (error) {
      next(error);
   }
};
