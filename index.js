require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
// logger
const morgan = require("morgan");
const connectDB = require("./database/connect");
const todoRouter = require("./routes/todo");
const authRouter = require("./routes/auth");
const { env } = require("./config/env");
const { errorMiddleware } = require("./middlewares/errorMiddleware");

const PORT = env.PORT;

// express.json()
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// connect DB
connectDB().then(() => {
  console.log("Connected Database Successfully!");
});

// todo api
app.use("/todo", todoRouter);
app.use("/auth", authRouter);

app.use(errorMiddleware);


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
