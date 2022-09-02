const mongoose = require('mongoose');
const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images/');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split('.')[0];//.split(' ').join('_')//
    const extension = MIME_TYPES[file.mimetype];
    const date = new Date()
    callback(null, name + "_" + date.getUTCDate() + "_" + (date.getMonth()+1) + "_" + date.getFullYear() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');