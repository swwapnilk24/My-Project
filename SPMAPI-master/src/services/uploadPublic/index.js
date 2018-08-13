import multer from 'multer'
var filessystem = require('fs')
import mkdirp from 'mkdirp'

// configuring Multer to use files directory for storing files
// this is important because later we'll need to access file path
const storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, `./src/public/${req.params.id}`)
  },
  filename (req, file, cb) {
    cb(null, `${file.originalname}`)
  }
})
const upload = multer({ storage }).single('file')

exports.uploadfile = () => {
  return (req, res, next) => {
    var dir = `./src/public/${req.params.id}`

    if (!filessystem.existsSync(dir)) {
      mkdirp(dir, function (err) {
        if (err) console.error(err)
        upload(req, res, function (err) {
          if (err) {
            // An error occurred when uploading
            return
          }
          next()
        })
      })
    } else {
      upload(req, res, function (err) {
        if (err) {
          // An error occurred when uploading
          return
        }
        next()
      })
    }
  }
}
