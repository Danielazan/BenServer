
const express = require("express")



const {
    PostNews,
    GetNews,
    DeleteNews,
    UpdateNews,
    GetSingle

}= require("../Controllers/NewsController")

const router =express.Router()

router.post("/news", PostNews)

router.get("/news", GetNews)

router.get("/news/:id", GetSingle)

router.delete('/news/:id', DeleteNews)

router.patch("/news/:id", UpdateNews)

module.exports= router

