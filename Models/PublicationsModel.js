const mongoose = require("mongoose")


const schema = mongoose.Schema


const PublicationModel = new schema ({
    Title:{
        type:String,
        required:true
    },
    descp:{
        type:String,
        required:true
    },
    img:{
        data:Buffer,
        ContentType:String
    }
},{timestamps:true})

module.exports= mongoose.model("Publications",PublicationModel)