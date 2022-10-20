const mongoose = require("mongoose")


const schema= mongoose.Schema

const newsSchema= new schema({
    title:{
        type:String,
        require:true
    },
    News:{
        type:String,
        require:true
    }
},{timestamps:true})


module.exports= mongoose.model("News",newsSchema)