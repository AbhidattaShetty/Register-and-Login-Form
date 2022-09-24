require("dotenv").config()
const express = require('express')
const bodyParser = require('body-parser')
const userRoute = require("./routes/userRoute")
const ejs = require('ejs')

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use(express.static('public'))
const port = process.env.PORT || 3000


// connecting DB
require('./db/conn')

app.use("/",userRoute)

app.listen(port, function(req,res){
  console.log(`Server running on port ${port}`)
})
