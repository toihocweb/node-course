require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
// logger
const morgan = require("morgan");
// const connectDB = require("./database/mongo/connect");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const roleRouter = require("./routes/role");
const orderRouter = require("./routes/order");
const fileRouter = require("./routes/file");
const categoryRouter = require("./routes/category");
const productRouter = require("./routes/product");
const couponRouter = require("./routes/coupon");
const { env } = require("./config/env");
const { errorMiddleware } = require("./middlewares/errorMiddleware");
const sequelize = require("./database/mysql/connect");
const Role = require("./models/mysql/Role");
const { roles } = require("./constant/roles");
const jwtAuth = require("./middlewares/jwtAuth");
const { authorize } = require("./middlewares/authorize");
const connectDB = require("./database/mongo/connect");
const MongoDB = require("./database/mongo/connect");

require("./models/mysql/relationship");


const PORT = env.PORT;

// express.json()
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// connect mongodb
MongoDB.connect();

// connect Mysql DB
sequelize
  .sync({ force: false, logging: false })
  .then(() => {
    console.log("Connected Database Successfully!");
  })
  .then(() => {
    // insert array of roles into table
    Role.bulkCreate(roles, {
      ignoreDuplicates: true,
    }).then(() => {
      console.log("Roles inserted");
    });
  })
  .catch((err) => {
    console.log("Can not connect DB");
    console.log(JSON.stringify(err, null, 2));
  });

app.use("/uploads", express.static("uploads"));
app.use("/auth", authRouter);
app.use("/role", jwtAuth, authorize("super_admin"), roleRouter);
app.use("/user", userRouter);
app.use("/category", jwtAuth, authorize("owner"), categoryRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/coupon", authorize("owner"), couponRouter);
app.use("/file", fileRouter);

app.use(errorMiddleware);


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
