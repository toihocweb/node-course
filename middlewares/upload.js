const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    // avatar-[date].png
    const { fieldname, originalname } = file;
    const ext = path.extname(originalname); // .png
    cb(null, `${fieldname}-${Date.now()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const { originalname } = file;
  if (!originalname.match(/\.(jpg|png|jpeg)$/i)) {
    // 1: throw ra loi
    // 2: true | false
    return cb(new Error(`Not support ${path.extname(originalname)}`), false);
  }
  cb(null, true);
};

const FILE_LIMIT = 5; // 5MB

const limits = {
  fileSize: FILE_LIMIT * 1024 * 1024,
};

const upload = multer({ storage, fileFilter, limits });

module.exports = upload;
