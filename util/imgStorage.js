const multer = require("multer");
const crypto = require("crypto");

const imgStorage = multer.diskStorage({
 
  destination: (req, file, cb) => 
    cb(null, "./public/assets/images/uploaded")
  ,

  filename: (req, file, cb) => 
    cb(null, `${crypto.randomUUID()}_${file.originalname}`)
  ,
});

module.exports = imgStorage;