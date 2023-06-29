require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
// logger
const morgan = require("morgan");
// const connectDB = require("./database/mongo/connect");
const authRouter = require("./routes/auth");
const addressRouter = require("./routes/address");
const { env } = require("./config/env");
const { errorMiddleware } = require("./middlewares/errorMiddleware");
const sequelize = require("./database/mysql/connect");

require("./models/mysql/relationship")


const PORT = env.PORT;

// express.json()
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// connect Mysql DB
sequelize.sync({ force: true }).then(() => {
  console.log("Connected Database Successfully!");
}).catch(() => {
  console.log("Can not connect DB")
})

app.use("/auth", authRouter);
app.use("/address", addressRouter);

app.use(errorMiddleware);


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
