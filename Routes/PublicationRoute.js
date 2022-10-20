const express = require("express")
const {
    GetPublication,
    GetSinglePublicImg,
    PostPublication,
    UpdatePublication,
    DeletePublication,
    ImageUpload
} = require("../Controllers/PublicationController")

const router= express.Router()

router.get("/Publication",GetPublication)

router.get("/Publication/:id",GetSinglePublicImg)

router.patch("/Publication/:id",ImageUpload.single("image"),UpdatePublication)

router.post("/Publication",ImageUpload.single("image"),PostPublication)

router.delete("/Publication/:id",DeletePublication)

module.exports= router