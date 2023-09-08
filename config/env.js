require('dotenv').config();

exports.env = {
  PORT: process.env.PORT || 3000,
  ENV: process.env.NODE_ENV || 'development',
  SECRET_KEY: process.env.SECRET_KEY || '123456',
  MONGO_HOST: process.env.MONGO_HOST || 'localhost',
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  MONGO_DATABASE: process.env.MONGO_DATABASE || 'nodejs-course',
  MONGO_USERNAME: process.env.MONGO_USERNAME,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  MONGO_BUCKET: process.env.MONGO_BUCKET || 'uploads',
  EXPIRED_IN: process.env.EXPIRED_IN || '1d',

  MYSQL_HOST: process.env.MYSQL_HOST || 'localhost',
  MYSQL_PORT: process.env.MYSQL_PORT || 3306,
  MYSQL_USER: process.env.MYSQL_USER || 'root',
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || 'root',
  MYSQL_DATABASE: process.env.MYSQL_DATABASE || 'my_database',

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '123456',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '123456',
  GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN || '123456',
  GOOGLE_TEST_EMAIL: process.env.GOOGLE_TEST_EMAIL || 'test@gmail.com',

  BASIC_USER: process.env.BASIC_USER || 'user',
  BASIC_PASSWORD: process.env.BASIC_PASSWORD || 'password',
  getMongoUri() {
    return this.MONGO_USERNAME && this.MONGO_PASSWORD
      ? `mongodb://${this.MONGO_USERNAME}:${this.MONGO_PASSWORD}@${this.MONGO_HOST}:${this.MONGO_PORT}/${this.MONGO_DATABASE}?authSource=admin`
      : `mongodb://${this.MONGO_HOST}:${this.MONGO_PORT}/${this.MONGO_DATABASE}`;
  },
};
