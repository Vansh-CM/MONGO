const { addCountry, addState, addCity, getCity, getStateByCountry } = require("../controller/country.controller")

const router = require("express").Router()


router.post("/country.add" , addCountry)
router.post('/state.add' , addState)
router.post('/city.add' , addCity)
router.get('/city.get' , getCity)
router.get('/state.get' , getStateByCountry)

module.exports = router