import userSchema from "../Model/userModel.js";
import { CatchAsync } from "../Middleware/CatchAsync.js";
import { ErrorHandler } from "../utils/sendError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//user registration
export const userRegister = CatchAsync(async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(req.body.password, salt);
  const user = await userSchema({
    ...req.body,
    password: hashPassword,
  });
  await user.save();

  res.status(201).json({
    success: true,
    message: "user created",
    user,
  });
});

//login

export const userLogin = CatchAsync(async (req, res, next) => {
  const user = await userSchema.findOne({ userName: req.body.userName });
  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }
  const comparePassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!comparePassword) {
    return next(new ErrorHandler("Either email or password is wrong", 404));
  }
  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  user.password = undefined;

  res.status(200).json({
    success: true,
    user,
    token,
  });
});
