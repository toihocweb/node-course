const mongoose = require('mongoose');
const { env } = require('../../config/env');

class MongoDB {
  static connect() {
    mongoose.connect(env.getMongoUri()).then(() => {
      console.log('mongodb connected successfully!');
    });

    const conn = mongoose.connection;

    conn.once('open', () => {
      this.gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: env.MONGO_BUCKET,
      });
    });
  }
}

module.exports = MongoDB;
