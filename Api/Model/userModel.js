import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter your name"],
    },
    userName: {
      type: String,
      required: [true, "please enter your user name"],
    },
    email: {
      type: String,
      required: [true, "please enter your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please enter your password"],
    },
    gender: {
      type: String,
      required: [true, "please enter your gender"],
    },

    phone: {
      type: String,
      required: [true, "please enter your contact number"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("user", userModel);
