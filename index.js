const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet")
const morgan = require("morgan")
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const nodemailer = require("nodemailer")
mongoose.connect("mongodb+srv://harshsaxena7:wewereonabreak@userdata.zns98zm.mongodb.net/test")


app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use("/api/user" , userRoute)
app.use("/api/auth" , authRoute)


app.get("/", (req, res) => {
    res.send("welcome")

})

app.listen(8000, () => {
    console.log("server is running at 8000")
})



