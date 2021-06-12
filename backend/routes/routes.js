const express=require("express");

const router=express.Router()
// const signUpTemplateCopy=require("../models/signUpModel")
const User=require("../models/signUpModel")

router.post("/signup",(request,response)=>{
  const signedUpUser=new User({
     
      userName:request.body.userName,
      email:request.body.email,
      password:request.body.password,
  })
 
  signedUpUser.save().then(data=>response.json(data)).catch(err=>response.json(err))
})

router.get("/mydatas",(req,res)=>{
  User.find().then(foundData=>res.json(foundData))
})
module.exports=router;