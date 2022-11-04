const express = require("express")

const {
    GetBibleVerse,
    UploadImg,
    getSignleVerse,
    PostBibleVerse,
    DeleteVerse,
    UpdateVerse
} = require ("../Controllers/BibleController")


const routers = express.Router()

routers.get("/bibleVerse", GetBibleVerse)


routers.post("/bibleVerse", UploadImg.single("image"),PostBibleVerse)

routers.get("/bibleVerse/:id", getSignleVerse)

routers.delete("/bibleVerse/:id", DeleteVerse)

routers.patch("/bibleVerse/:id",UploadImg.single("image"), UpdateVerse)

module.exports = routers