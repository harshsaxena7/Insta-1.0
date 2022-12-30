const router = require("express").Router();
const User = require("../models/model")
const nodemailer = require("nodemailer")
const utility = require("../mailer");


router.post("/register" , async(req ,res)=>{
  const newUser = new User({
    username:req.body.username,
   email:req.body.email,
   password:req.body.password
  });
  try{
    const User = await newUser.save();
    var email=req.body.email
    let subject = "Register Info";
        let sentTo = email;
        let content = "<b>Thank You for signing Up on Insta-1.0</b>"

        let sentResponse = utility.mailsend(subject, sentTo, content);

        console.log("Email Send response " + sentResponse);
    res.send("new user registered")

  }
  catch{
    console.log(err)
  }
})
module.exports = router