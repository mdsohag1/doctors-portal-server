import mongoose from "mongoose";

const ApointMentSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      userId: {
         type: String,
      },
      email: {
         type: String,
         required: true,
      },
      phone: {
         type: String,
         required: true,
      },
      doctorTime: {
         type: String,
         required: true,
      },
      gender: {
         type: String,
         required: true,
      },
      age: {
         type: Number,
         default: 0,
      },
      weight: {
         type: Number,
         default: 0,
      },
      isDoctor: {
         type: Boolean,
         default: false,
      },
   },
   { timestamps: true }
);

export default mongoose.model("appointments", ApointMentSchema);
