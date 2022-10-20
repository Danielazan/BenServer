const express = require("express")

const {
    GetOne,
    PostVideo,
    getVideo,
    deleteOne,
    upload
  }= require("../Controllers/VideoController")
const router = express.Router()

router.get("/Media", getVideo)

router.get("/read/:filename", GetOne)

router.post("/file",upload.single("video"),PostVideo)

router.delete("/file/:filename", deleteOne)

// router.post("/Media",UploadVideo.single("videos"),PostBibleVideo)

// router.patch("/Media/:id",UploadVideo.single("videos"), UpdateVideo)

// router.delete("/Media/:id", DeleteVideo)


module.exports = router