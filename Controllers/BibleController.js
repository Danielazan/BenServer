const mongoose = require("mongoose")

const fs= require("fs")

const path = require('path')

const  BibleModel = require ("../Models/BibleModel")

const multer = require ("multer")
// const { dirname } = require("path/posix")


const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, (path.join( __dirname + "/Images/")))
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname + "_" + Date.now())
    }
})

const UploadImg = multer({
    storage: storage,

      fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) { 
           // upload only png and jpg format
           return cb(new Error('Please upload a Image'))
         }
       cb(undefined, true)
    }
})


// Get all BibleVerse
const getSignleVerse = async (req, res)=>{
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such error"})
    }

    const verse = await BibleModel.findById(id)

    if(!verse){
        res.status(404).json({error:"No such verse exist"})
    }

    res.status(200).json(verse)
}
const GetBibleVerse = async (req, res)=>{
    const Bibleverse = await BibleModel.find({}).sort({createdAt: -1})

    res.status(200).json(Bibleverse)


}

//Get Single Bibleverse

const PostBibleVerse= async (req,res)=>{
    const obj ={
        BibleVerse:req.body.BibleVerse,
        BibleChapter:req.body.BibleChapter,
        // desc:req.body.desc,
        img:{
            data: fs.readFileSync(path.join(__dirname + "/Images/" + req.file.filename)),
            ContentType:"image/png"
        }
    }

    try{
        const Bibleverse= await BibleModel.create(obj)
        res.status(200).json(Bibleverse)
    }

    catch(err){
        if(err){
            res.status(400).json({err:err.message})
        }
    }
}

const DeleteVerse = async (req, res)=>{
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"no such Verse exits"})
    }

    const verse = await BibleModel.findOneAndDelete({_id:id})

    if(!verse){
        res.status(400).json({error:"No such Verse exist"})
    }

    res.status(200).json(verse)
}

const UpdateVerse = async (req, res)=>{
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(404).json({error:"No such Verse exist"})
    }

    const verse = await BibleModel.findOneAndUpdate({_id:id},{...req.body})

    if(!verse){
       res.status(404).json({error:"No such verse exist"})
    }

    res.status(200).json(verse)
}

module.exports = {
    GetBibleVerse,
    getSignleVerse,
    UploadImg,
    PostBibleVerse,
    DeleteVerse,
    UpdateVerse
}