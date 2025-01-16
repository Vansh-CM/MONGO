const express = require('express')
const { addOrder, salesByProduct, topOrder, totalSellAmount, topSell } = require('../controller/order.controller')
const router = express.Router()

router.post('/add' , addOrder)
router.get('/sales' , salesByProduct)
router.get('/top/order' , topOrder )
router.get('/top/totalSell' , totalSellAmount )
router.get('/top/sell' , topSell )


module.exports = router