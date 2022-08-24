import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import appointRoute from "./routes/AppointRoute.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

mongoose
   .connect(process.env.DB_URL)
   .then(() => app.listen(PORT, () => console.log(`app is listen at ${PORT}`)));

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/auth", authRoute);
app.use("/api/users", UserRoute);
app.use("/api/appoint", appointRoute);

app.use((err, req, res, next) => {
   const status = err.status || 500;
   const message = err.message || "somthing went wrong";
   return res.status(status).json({
      success: false,
      status,
      message,
   });
});
