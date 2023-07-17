const express = require("express");

const categoryController = require("../controllers/categoryController");
const MongoDB = require("../database/mongo/connect");
const { ErrorResponse } = require("../response/ErrorResponse");

const router = express.Router();

// http://localhost:3000/file/a.mp4

router.get("/:filename", async (req, res, next) => {
  const { filename } = req.params;

  const file = await MongoDB.gfs.find({ filename }).toArray((err, files) => {
    console.log(err);
  });

  if (!file || !file.length) {
    return next(new ErrorResponse(404, "File is not found"));
  }

  MongoDB.gfs.openDownloadStreamByName(filename).pipe(res);
});

module.exports = router;
