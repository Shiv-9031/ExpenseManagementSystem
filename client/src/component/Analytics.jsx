import React from "react";
import { Progress } from "antd";

export const Analytics = ({ transaction }) => {
  //category
  const categories = [
    "Salary",
    "movie",
    "Tip",
    "Project",
    "bills",
    "Medical",
    "tax",
  ];
  //total transaction
  let totalTransaction = transaction.length;
  const totalIncomeTransaction = transaction.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransaction = transaction.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomePercent =
    (totalIncomeTransaction.length / totalTransaction) * 100;
  const totalExpensePercent =
    (totalExpenseTransaction.length / totalTransaction) * 100;

  //total turnover
  const totalTurnover = transaction.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = transaction
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenseTurnover = transaction
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnOverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnOverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;
  return (
    <>
      <div className="row" style={{ display: "flex" }}>
        <div className="co-md-4">
          <div className="card">
            <div className="card-header">
              Total Transaction :{totalTransaction}
            </div>
            <div className="card-body">
              <h5>Income:{totalIncomeTransaction.length}</h5>
              <h5>Expense:{totalExpenseTransaction.length}</h5>
            </div>
            <div className="chart">
              <Progress
                type="circle"
                strokeColor={"green"}
                className="income-progress"
                percent={totalIncomePercent.toFixed(0)}
              />
              <Progress
                type="circle"
                strokeColor={"red"}
                className="expense-progress"
                percent={totalIncomePercent.toFixed(0)}
              />
            </div>
          </div>
        </div>
        <div className="co-md-4">
          <div className="card">
            <div className="card-header">
              Total Transaction :{totalTurnover}
            </div>
            <div className="card-body">
              <h5>Income:{totalIncomeTurnover}</h5>
              <h5>Expense:{totalExpenseTurnover}</h5>
            </div>
            <div className="chart">
              <Progress
                type="circle"
                strokeColor={"green"}
                className="income-progress"
                percent={totalIncomeTurnOverPercent.toFixed(0)}
              />
              <Progress
                type="circle"
                strokeColor={"red"}
                className="expense-progress"
                percent={totalExpenseTurnOverPercent.toFixed(0)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="co-md-3">
          <h4>Categorywise Income</h4>
          {categories.map((category) => {
            const amount = transaction
              .filter(
                (transaction) =>
                  transaction.type == "income" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && (
                <div className="card">
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / totalIncomeTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
      <div className="row">
        <div className="co-md-3">
          <h4>Categorywise Expense</h4>
          {categories.map((category) => {
            const amount = transaction
              .filter(
                (transaction) =>
                  transaction.type == "expense" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && (
                <div className="card">
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / totalExpenseTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};
