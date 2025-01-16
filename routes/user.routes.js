const { signup , login, userList} = require('../controller/user.controller')
const router = require('express').Router()



router.post('/signup',signup )
router.post('/login',login )
router.get('/userList',userList )
module.exports = router