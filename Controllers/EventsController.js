const mongoose= require("mongoose")

const express = require("express")

const fs= require("fs")

const multer = require("multer")

const path = require('path')

const EventModel = require("../Models/EventsModel")


const EventsImg = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, (path.join(__dirname + "/Images/")))
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname + "_" + Date.now())
    }
})

const EventUpload = multer({
    storage:EventsImg,

    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) { 
           // upload only png and jpg format
           return cb(new Error('Please upload a Image'))
         }
       cb(undefined, true)
    }
})

const GetSingleEvent = async (req, res)=>{
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such Event exist"})
    }

    const Event = await EventModel.findById(id)

    if (!Event){
        res.status(400).json({error:"No such information exist"})
    }

    res.status(200).json(Event)
}

const GetEvent = async (req, res)=>{
    const Event = await EventModel.find({}).sort({createdAt:-1})

    res.status(200).json(Event)
}

const PostEvent = async (req, res)=>{
    const obj = {
        Title: req.body.Title,
        About: req.body.About,
        img:{
            data: fs.readFileSync(path.join(__dirname + "/Images/" + req.file.filename)),
            ContentType:"image/png"
        }
    }

    try{
        const Event = await EventModel.create(obj)
        res.status(200).json(Event)
    }

    catch(err){
        if(err){
            res.status(400).json({err:err.message})
        }
    }
}

const UpdateEvent = async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such infomation exist"})
    }

    const Event = await EventModel.findOneAndUpdate({_id:id},{...req.body})

    if(!Event){
        res.status(404).json({error:"No such Information Exist"})
    }

    res.status(200).json(Event)
}

const DeleteEvent = async (req, res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Information exist"})
    }
     const Event = await EventModel.findOneAndDelete({_id:id})

     res.status(200).json(Event)
}

module.exports ={
    GetEvent,
    GetSingleEvent,
    PostEvent,
    UpdateEvent,
    DeleteEvent,
    EventUpload
}