const mongoose = require("mongoose")

const schema = mongoose.Schema

const EventModel = new schema({
    Title:{
        type:String,
        require:true
    },
    About:{
        type:String,
        require:true
    },
    img:{
        data:Buffer,

        ContentType:String
    }
},{timestamps:true})


module.exports= mongoose.model("Events",EventModel)