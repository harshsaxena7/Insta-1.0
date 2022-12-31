const router = require("express").Router();
const User = require("../models/model")
const nodemailer = require("nodemailer")
const utility = require("../mailer")
const bcrypt = require("bcrypt")



router.post("/register", async (req, res) => {
    //   const newUser = new User({
    //     username:req.body.username,
    //    email:req.body.email,
    //    password:req.body.password

    // });


    //     var email=req.body.email
    //     User.findOne({ email: email }).exec((err, user) => {
    //         console.log('user', user)
    //         if (user) {
    //             res.status(400);
    //              res.send({ error: "user already exists" });
    //         }
    //     })
    //     const User = await newUser.save();
    //     var email=req.body.email
    //     let subject = "Register Info";
    //         let sentTo = email;
    //         let content = "<b>Thank You for signing Up on Insta-1.0</b>"

    //         let sentResponse = utility.mailsend(subject, sentTo, content);

    //         console.log("Email Send response " + sentResponse);
    //     res.send("new user registered")

    console.log(req.body);
    const { username, email, password ,gender ,DateOfBirth } = req.body;
    console.log('req.body', req.body);

    console.log('email', email)

    User.findOne({ email: email }).exec((err, user) => {
        console.log('user', user)
        if (user) {
            res.status(400);
            return res.send({ error: "user already exists" });
        }

        let subject = "Signup Info";
        let sentTo = email;
        let content = "<b>Thank You for signing Up on Insta-1.0</b>"

        let sentResponse = utility.mailsend(subject, sentTo, content);

        console.log("Email Send response " + sentResponse);
        let newUser = new User({ username, email, password,gender ,DateOfBirth });
        console.log('newUser ', newUser);
        newUser.isNew = true;
        newUser.save((err, success) => {
            if (err) {
                console.log("error on sign:", err);

            }
            res.json({
                message: "signup is successful"
            })
        })
    })

})
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("user not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("wrong password")

        res.status(200).json(user)
        var email = req.body.email
        let subject = "Login Alert";
        let sentTo = email;
        let content = "<b>There is an attempt of login on Insta-1.0 from your Id</b>"

        let sentResponse = utility.mailsend(subject, sentTo, content);

        console.log("Email Send response " + sentResponse);
    } catch (err) {
        res.status(500).json(err)
    }
});
module.exports = router