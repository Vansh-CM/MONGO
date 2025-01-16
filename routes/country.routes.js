const { addCountry, addState, addCity, getCity, getStateByCountry, getAllCountryCity } = require("../controller/country.controller")

const router = require("express").Router()


router.post("/country.add" , addCountry)
router.post('/state.add' , addState)
router.post('/city.add' , addCity)
router.get('/city.get' , getAllCountryCity)
router.get('/state.get' , getStateByCountry)

module.exports = router