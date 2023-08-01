const mongoose = require("mongoose");
const { env } = require("../../config/env");

class MongoDB {
  static connect() {
    mongoose
      .connect(
        env.MONGO_USERNAME && env.MONGO_PASSWORD
          ? `mongodb://${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@${env.MONGO_HOST}:${env.MONGO_PORT}/${env.MONGO_DATABASE}`
          : `mongodb://${env.MONGO_HOST}:${env.MONGO_PORT}/${env.MONGO_DATABASE}`
      )
      .then(() => {
        console.log("mongodb connected successfully!");
      });

    const conn = mongoose.connection;

    conn.once("open", () => {
      this.gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: env.MONGO_BUCKET,
      });
    });
  }
}

module.exports = MongoDB;
