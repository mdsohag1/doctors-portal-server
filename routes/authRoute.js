import express from "express";
import { signin, signup } from "../controllers/authController.js";

const router = express.Router();

//create a user
router.post("/signup", signup);

//sign in
router.post("/signin", signin);


export default router;
