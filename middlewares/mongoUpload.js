const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const crypto = require("crypto");

const path = require("path");
const { env } = require("../config/env");

const storage = new GridFsStorage({
  url: env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(20, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename,
          bucketName: env.MONGO_BUCKET,
        };
        resolve(fileInfo);
      });
    });
  },
});

const fileFilter = (req, file, cb) => {
  const { originalname } = file;
  if (!originalname.match(/\.(jpg|png|jpeg|mp4)$/i)) {
    return cb(new Error(`Not support ${path.extname(originalname)}`), false);
  }
  cb(null, true);
};

const FILE_LIMIT = 5; // 5MB

const limits = {
  fileSize: FILE_LIMIT * 1024 * 1024,
};

const mongoUpload = multer({ storage, fileFilter, limits });

module.exports = mongoUpload;
