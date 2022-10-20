const express = require("express")

const {
    GetSingleTeam,
    GetTeamMembers,
    PostMember,
    UpdateMember,
    DeleteMember,
    SendImg
} = require("../Controllers/TeamController")

const router = express.Router()

router.get("/ServiceTeams", GetTeamMembers)

router.get("/ServiceTeams/:id", GetSingleTeam)

router.post("/ServiceTeams",SendImg.single("image"), PostMember)

router.patch("/ServiceTeams/:id",SendImg.single("image"), UpdateMember)

router.delete("/ServiceTeams/:id", DeleteMember)


module.exports = router