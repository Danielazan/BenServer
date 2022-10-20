const mongoose= require("mongoose")

const schema = mongoose.Schema

const SeviceModel = new schema({
    Name:{
        type:String,
        required:true
    },
    img:{
        data: Buffer,
        ContentType:String
    },
    desc:{
        type:String,
        required:true
    }
                                                                                                                                                                
}, {timestamps:true})

module.exports= mongoose.model("ServiceTeam", SeviceModel)