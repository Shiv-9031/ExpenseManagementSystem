import express from "express";
import {
  addTransaction,
  getAllTransaction,
  editTransaction,
  deleteTransaction,
} from "../Controllers/transactionController.js";

const routes = express.Router();

routes.route("/getAll").post(getAllTransaction);
routes.route("/post-transaction").post(addTransaction);
routes.route("/edit-transaction").post(editTransaction);
routes.route("/delete-transaction").post(deleteTransaction);

export default routes;
