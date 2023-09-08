require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
// logger
const morgan = require('morgan');
// const connectDB = require("./database/mongo/connect");
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const roleRouter = require('./routes/role');
const orderRouter = require('./routes/order');
const fileRouter = require('./routes/file');

const categoryRouter = require('./routes/category');
const productRouter = require('./routes/product');
const couponRouter = require('./routes/coupon');
const { env } = require('./config/env');
const { errorMiddleware } = require('./middlewares/errorMiddleware');
const sequelize = require('./database/mysql/connect');
const jwtAuth = require('./middlewares/jwtAuth');
const { authorize } = require('./middlewares/authorize');
const MongoDB = require('./database/mongo/connect');
const { limiter } = require('./middlewares/limiter');
const basicAuth = require('./middlewares/basicAuth');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('swagger-jsdoc');
const http = require('http');
const { Server } = require('socket.io');

require('./models/mysql/relationship');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ecommerce API',
      version: '1.0.0',
      description: 'Ecommerce API',
      contact: {
        name: 'Nhat Bui',
        url: 'https://facebook.com/thaynhatdepchai',
        email: 'admin@nhat.tech',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
      },
      {
        url: 'http://12.334.12.32:3000/api/v1',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        basicAuth: {
          type: 'http',
          scheme: 'basic',
        },
      },
    },
  },
  apis: ['./controllers/*.js'],
};

const specs = swaggerDoc(options);

const PORT = env.PORT;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// express.json()
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// connect mongodb
MongoDB.connect();

// connect Mysql DB
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected Database Successfully!');
  })
  .catch((err) => {
    console.log('Can not connect DB');
    console.log(JSON.stringify(err, null, 2));
  });

app.use('/api/v1/uploads', express.static('uploads'));
app.use('/api/v1/auth', limiter({ max: 100 }), basicAuth, authRouter);
app.use('/api/v1/role', jwtAuth, authorize('super_admin'), roleRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/category', jwtAuth, authorize('owner'), categoryRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/coupon', authorize('owner'), couponRouter);
app.use('/api/v1/file', fileRouter);

app.use(errorMiddleware);

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

const messages = [];

io.on('connection', (socket) => {
  io.emit('current-messages', messages);

  socket.on('user-send-message', (msg) => {
    messages.push({
      socketId: socket.id,
      msg,
    });
    io.emit('server-send-message', {
      socketId: socket.id,
      msg,
    });
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

httpServer.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
