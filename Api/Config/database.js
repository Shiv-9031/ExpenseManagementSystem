import mongoose from "mongoose";

export const dbConn = async () => {
  try {
    await mongoose.connect(process.env.DB_PORT);
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};
