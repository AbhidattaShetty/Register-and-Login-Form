const express = require("express")
const router = express.Router()
const User = require('../models/userSchema')
const bcrypt = require('bcrypt')

router.get('/',function(req,res){
  res.render("home")
})

router.get("/register",function(req,res){
  res.render("register")
})

router.get("/login",function(req,res){
  res.render("login")
})

router.post('/register',async (req, res) => {
    console.log(req.body);
    const { email, password} = req.body

    const Email = await User.findOne({ email })
   //if already exist show error status
   if (Email) {
       res.redirect("/login")
   } else{
     //hashing and salting password
     const saltRounds = 10
     const salt = await bcrypt.genSalt(saltRounds)
     const passHash = await bcrypt.hash(password, salt)
     // console.log(passHash);

     //inserting data using try catch to database
         const user = await new User({
             email,
             password: passHash
         })
         //to save the data in database
         user.save(function(err){
           if(err){
             res.send(err)
           }else{
             res.render("secrete")
           }
         })
   }
})


router.post("/login",async(req,res)=>{
  const {email, password} = req.body

    userValid = await User.findOne({email})
    if(userValid){
      const cmp = await bcrypt.compare(password, userValid.password)
      if(cmp){
        res.render("secrete")
      }else {
        res.render("pass")
      }
    }else{
      res.render("cred")
    }
})

module.exports = router
