const mongoose= require("mongoose")

const schema = mongoose.Schema

const VideoModel = new schema({
    Title:{
        type:String,
        required:true
    },
    vid:{
        type: mongoose.Types.ObjectId,
        ref:"fs.files",
    },
    Containe:{
        type:String,
        required:true
    }
                                                                                                                                                                
}, {timestamps:true})

module.exports= mongoose.model("Media", VideoModel)