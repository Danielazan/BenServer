const express = require("express")
const {
    GetEvent,
    GetSingleEvent,
    PostEvent,
    UpdateEvent,
    DeleteEvent,
    EventUpload
} = require("../Controllers/EventsController")

const router= express.Router()

router.get("/Events", GetEvent)

router.get("/Events/:id",GetSingleEvent)

router.patch("/Events/:id",EventUpload.single("image"),UpdateEvent)

router.post("/Events",EventUpload.single("image"),PostEvent)

router.delete("/Events/:id", DeleteEvent)

module.exports= router