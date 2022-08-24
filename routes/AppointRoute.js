import express from "express";
import {
   addAppoint,
   deleteApoint,
   getALlAppointment,
   updateAppoint,
} from "../controllers/AppointController.js";

import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//create a video
router.post("/", verifyToken, addAppoint);
//update video
router.put("/:id", verifyToken, updateAppoint);
//delete video
router.delete("/:id", verifyToken, deleteApoint);
//get alluser
router.get("/getallAppointment", verifyToken, getALlAppointment);

export default router;
