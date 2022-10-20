const mongoose = require("mongoose")


const schema = mongoose.Schema

const BibleSchema = new schema({
    BibleVerse:{
        type:String,
        required:true
      },
      
      BibleChapter:{
        type:String,
        required:true
      },

    // desc:{
    //     type:String,
    //     required:true
    // },

    img:{
        data:Buffer,

        ContentType:String
    }
},{timestamps:true})

module.exports = mongoose.model('BibleVerse',BibleSchema)