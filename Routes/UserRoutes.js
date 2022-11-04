const express = require("express")
const {signup, loginUser}= require("../Controllers/UserController.js")
const router = express.Router()

router.post("/login",loginUser)

router.post("/signup", signup)


module.exports=router