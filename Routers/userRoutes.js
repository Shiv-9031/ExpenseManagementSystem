import express from "express";
import { userLogin, userRegister } from "../Controllers/userControllers.js";

const routes = express.Router();

routes.route("/register").post(userRegister);
routes.route("/login").post(userLogin);

export default routes;
