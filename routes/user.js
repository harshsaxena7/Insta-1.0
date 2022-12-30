const router = require("express").Router();

router.get("/" , (req ,res)=>{
    res.send("hello its user")
})
module.exports = router