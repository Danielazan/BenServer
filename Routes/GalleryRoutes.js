const express = require("express")

const {
    GetPic,
    PostGallary,
    getGallary,
    deletePic,
    upload
  }= require("../Controllers/GalleryController")
const router = express.Router()

router.get("/Photos", getGallary)

router.get("/Photos/:filename", GetPic)

router.post("/Photos",upload.array('photos', 12),PostGallary)

router.delete("/Photos/:filename", deletePic)




module.exports = router