import { CatchAsync } from "../Middleware/CatchAsync.js";
import transactionSchema from "../Model/transactionModel.js";
import moment from "moment";

export const getAllTransaction = CatchAsync(async (req, res, next) => {
  const { frequency, selectedDate, type } = req.body;

  const getAllTransaction = await transactionSchema.find({
    ...(frequency !== "custom"
      ? {
          date: {
            $gt: moment().subtract(Number(frequency), "days").calendar(),
          },
        }
      : {
          date: {
            $gte: selectedDate[0],
            $lte: selectedDate[1],
          },
        }),
    userid: req.body.userid,
    ...(type !== "all" && { type }),
  });
  getAllTransaction
    ? res.status(200).json({
        message: "success",
        getAllTransaction,
      })
    : next(new Error("transaction not found", 500));
});

//add transaction

export const addTransaction = CatchAsync(async (req, res, next) => {
  const newTransaction = new transactionSchema(req.body);
  await newTransaction.save();
  res.status(201).json({
    message: "transaction created",
  });
});

export const editTransaction = CatchAsync(async (req, res, next) => {
  await transactionSchema.findOneAndUpdate(
    { _id: req.body.transactionId },
    req.body.payload
  );

  res.status(200).send("Edit successfully");
});

//delete transaction
export const deleteTransaction = CatchAsync(async (req, res, next) => {
  await transactionSchema.findOneAndDelete({ _id: req.body.transactionId });

  res.status(200).send("Transaction deleted successfully");
});
