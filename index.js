const express = require("express")
const bodyParser = require("body-parser")
const dotEve = require('dotenv').config()
const  mongoose = require('mongoose')
const cors = require('cors')

const userRouter = require('./routes/user.routes')
const countryRouter = require("./routes/country.routes")
const productRouter = require("./routes/product.route")
const orderRouter = require('./routes/order.routes')
const app =  express()
app.use('/uploads', express.static('uploads'));
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


mongoose.connect(process.env.MONGO_URL).then((result)=>{
  console.log("connected . . .")
  app.use('/api/user' , userRouter)
  // app.use('/api/address' , countryRouter)
  app.use('/api/product' ,  productRouter)
  app.use('/api/order' , orderRouter)
  app.use('/api/country' , countryRouter)
  app.post('/api/htmlToPdf' , (req , res) => {

    
  })

})



app.listen(process.env.PORT , ()=>{
    console.log("started" , process.env.PORT);
    
})



