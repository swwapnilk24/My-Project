import multer from 'multer'
var filessystem = require('fs')
var path = require('path');
var mime = require('mime');
import mkdirp from 'mkdirp'

// configuring Multer to use files directory for storing files
// this is important because later we'll need to access file path
const storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, `./files/${req.params.id}`)
  },
  filename (req, file, cb) {
    cb(null, `inprocessClaims_${Date.now()}_${file.originalname}`)
  }
})
const upload = multer({ storage }).single('file')

exports.uploaddocfile = () => {
  return (req, res, next) => {
    var dir = `./files/${req.params.id}`

    if (!filessystem.existsSync(dir)) {
      mkdirp(dir, function (err) {
        if (err) console.error(err)
        upload(req, res, function (err) {
          if (err) {
            console.error(err);
            return
          }
          next()
        })
      })
    } else {
      upload(req, res, function (err) {
        if (err) {
          console.error(err);
          return
        }
        next()
      })
    }
  }
}
// A method to downlaod a file from the 
exports.downloadfile = () => {
  return (req, res, next) => {
    console.log('request params', req.params.id, req.params.filename);
    const __dirname = `./files/${req.params.id}`;
    var file = `${__dirname}/${req.params.filename}`;
    var mimetype = mime.lookup(file);    
    console.log('filename-mimitype', file, mimetype);
    if (filessystem.existsSync(__dirname)) {
      console.log('directory exits');
      if(filessystem.existsSync(file)) {
        console.log('file exits');
      }
      res.setHeader('Content-disposition', 'attachment; filename=' + file);
      res.setHeader('Content-type', mimetype);
      var filestream = filessystem.createReadStream(file);
      filestream.pipe(res);
    }
    next();
  }
}
