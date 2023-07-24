import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

//importing end points of routes
import userRoutes from "./Routers/userRoutes.js";
import transactionRoutes from "./Routers/transactionRoutes.js";

import { ErrorHandler } from "./Middleware/Error.js";
import { dbConn } from "./Config/database.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config({ path: "Config/.env" });

//ucaught exception error handle
process.on("uncaughtException", (err) => {
  console.log(`server is going to closing due to ${err.message}`);
  process.exit(1);
});

const app = express();
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// end points of routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/transaction", transactionRoutes);
//static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//error handle middleware
app.use(ErrorHandler);

const server = app.listen(process.env.PORT, () => {
  dbConn();
  console.log(`server is running ${process.env.PORT}`);
});

//unhandle promise rejection

process.on("unhandledRejection", (err) => {
  console.log(`server is closing due to ${err.message}`);

  server.close(() => {
    process.exit(1);
  });
});
