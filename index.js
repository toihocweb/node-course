require("dotenv").config();

const express = require("express");

const app = express();
// logger 
const morgan = require("morgan");
const connectDB = require("./database/connect");
const todoRouter = require("./routes/todo")
const authRouter = require("./routes/auth");
const { env } = require("./config/env");


const PORT = env.PORT

// express.json()
app.use(express.json());
app.use(morgan("dev"))

// connect DB
connectDB().then(() => {
  console.log("Connected Database Successfully!")
})

// todo api
app.use("/todo", todoRouter)
app.use("/auth", authRouter)

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
