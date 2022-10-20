const mongoose= require("mongoose")

const express = require("express")

const fs= require("fs")

const multer = require("multer")

const path = require('path')

const PublicationModel = require("../Models/PublicationsModel")


const PublicImg = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, (path.join(__dirname + "/Images/")))
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname + "_" + Date.now())
    }
})

const ImageUpload = multer({
    storage:PublicImg,

    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) { 
           // upload only png and jpg format
           return cb(new Error('Please upload a Image'))
         }
       cb(undefined, true)
    }
})

const GetSinglePublicImg = async (req, res)=>{
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such publication exist"})
    }

    const Publication = await PublicationModel.findById(id)

    if (!Publication){
        res.status(400).json({error:"No such information exist"})
    }

    res.status(200).json(Publication)
}

const GetPublication = async (req, res)=>{
    const Publication = await PublicationModel.find({}).sort({createdAt:-1})

    res.status(200).json(Publication)
}

const PostPublication = async (req, res)=>{
    const obj = {
        Title: req.body.Title,
        descp: req.body.descp,
        img:{
            data: fs.readFileSync(path.join(__dirname + "/Images/" + req.file.filename)),
            ContentType:"image/png"
        }
    }

    try{
        const Publication = await PublicationModel.create(obj)
        res.status(200).json(Publication)
    }

    catch(err){
        if(err){
            res.status(400).json({err:err.message})
        }
    }
}

const UpdatePublication = async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such infomation exist"})
    }

    const Publication = await PublicationModel.findOneAndUpdate({_id:id},{...req.body})

    if(!Publication){
        res.status(404).json({error:"No such Information Exist"})
    }

    res.status(200).json(Publication)
}

const DeletePublication = async (req, res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Information exist"})
    }
     const Publication = await PublicationModel.findOneAndDelete({_id:id})

     res.status(200).json(Publication)
}

module.exports ={
    GetPublication,
    GetSinglePublicImg,
    PostPublication,
    UpdatePublication,
    DeletePublication,
    ImageUpload
}