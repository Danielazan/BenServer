const express = require("express")

const {
    GetBibleVerse,
    UploadImg,
    getSignleVerse,
    PostBibleVerse,
    DeleteVerse,
    UpdateVerse
} = require ("../Controllers/BibleController")
const router = require("./NewsRoutes")

const routers = express.Router()

routers.get("/bibleVerse", GetBibleVerse)


router.post("/bibleVerse", UploadImg.single("image"),PostBibleVerse)

router.get("/bibleVerse/:id", getSignleVerse)

router.delete("/bibleVerse/:id", DeleteVerse)

router.patch("/bibleVerse/:id",UploadImg.single("image"), UpdateVerse)

module.exports = routers