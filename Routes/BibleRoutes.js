const express = require("express")

const {
    GetOne,
    Postbible,
    getbible,
    deleteOne,
    upload
  }= require("../Controllers/BibleController")
const router = express.Router()

router.get("/bible", getbible)

router.get("/bible/:filename", GetOne)

router.post("/bible",upload.single("bible"),Postbible)

router.delete("/bible/:filename", deleteOne)

// router.post("/Media",UploadVideo.single("videos"),PostBibleVideo)

// router.patch("/Media/:id",UploadVideo.single("videos"), UpdateVideo)

// router.delete("/Media/:id", DeleteVideo)


module.exports = router