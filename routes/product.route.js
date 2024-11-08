const express = require('express')
const router = express.Router()
const { addProduct, addProducts, list } = require('../controller/product.controller')

router.get('/list' ,list )
router.post('/add' , addProduct)
router.post('/add/products' , addProducts)



module.exports = router