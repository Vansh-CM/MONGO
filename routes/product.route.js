const express = require('express')
const router = express.Router()
const multer = require('multer');
const path = require('path');
const { addProduct, addProducts, list, update } = require('../controller/product.controller')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/');  // specify the directory for storing images
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));  // generate a unique filename
    }
  });
  const upload = multer({ storage: storage });
  router.get('/list' ,list )
router.post('/add' , addProduct)
router.post('/add/products' , addProducts)
router.put('/update/:id', upload.single('image'),update)



module.exports = router