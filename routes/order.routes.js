const express = require('express')
const { addOrder, salesByProduct } = require('../controller/order.controller')
const router = express.Router()

router.post('/add' , addOrder)
router.get('/sales' , salesByProduct)


module.exports = router