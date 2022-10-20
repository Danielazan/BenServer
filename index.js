const express = require('express')
const mongoose = require("mongoose")
require("dotenv").config()
const cors = require("cors")

const NewsRoutes = require("./Routes/NewsRoutes") 

const BibleRoutes = require("./Routes/BibleRoutes")

const TeamRoutes= require("./Routes/TeamRoutes")

const PublicationRoutes = require("./Routes/PublicationRoute")

const VideoRoute = require("./Routes/VideoRoutes")

const EventsRoute = require("./Routes/EventsRoute")

const {
    GetOne,
    PostVideo,
    getVideo,
    deleteOne,
    upload
  }= require("./controllers/videoController")


const app = express()
const bodyParser = require('body-parser')

// middleware
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(cors())

app.use("/api", NewsRoutes)

app.use("/api", BibleRoutes)

app.use("/api", TeamRoutes)

app.use("/api", PublicationRoutes)

app.use("/api" ,VideoRoute)

app.use("/api", EventsRoute)



// app.get("/file", getVideo)

// app.get("/file/:filename", GetOne)

// app.post("/file",upload.single("video"),PostVideo)

// app.delete("/file/:filename", deleteOne)


// app.get("/", (req,res)=>{
//     console.log('i am connected')
//     res.send("welcome")
// })

mongoose.connect(process.env.MONOURL)
.then( ()=>{

    app.listen(process.env.PORT, (req,res)=>{
        console.log("database connected..... listening on port 5000")
    })
})
.catch((err)=>{
    console.log(err)
})
