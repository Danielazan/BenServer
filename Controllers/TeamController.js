const TeamModel = require("../Models/ServiceTeamModel")

const express = require("express")

const fs = require ("fs")
const path = require("path")

const multer = require("multer")
const  mongoose  = require("mongoose")
 
// Setting Up multer

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, (path.join(__dirname + "/Images/")))
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname + "_" + Date.now())
    }
})

const SendImg = multer({
    storage:storage,

    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return cb(new Error("Please upload a Image"))
        }
        cb(undefined,true)
    }
})

const GetSingleTeam = async (req, res)=>{
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such error"})
    }

    const Memeber = await TeamModel.findById(id)

    if(!Memeber){
        res.status(404).json({error:"No such Memeber exist"})
    }

    res.status(200).json(Memeber)
}

const GetTeamMembers= async(req,res)=>{

    const Member = await TeamModel.find({}).sort({createdAt: -1})

    res.status(200).json(Member)
}

const PostMember = async (req,res)=>{

    const model ={
        Name:req.body.Name,
        desc:req.body.desc,
        img:{
            data: fs.readFileSync(path.join(__dirname + "/Images/" + req.file.filename)),
            ContentType:"image/png"
        }
    }
    try{
        const Members = await TeamModel.create(model)

        res.status(200).json(Members)
    }
    catch(err){
        if(err){
            res.status(400).json({err:err.message})
        }
    }
}

const UpdateMember = async(req,res)=>{
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such Member Exist"})
    }

    const Member = await TeamModel.findOneAndUpdate({_id:id},{...req.body})

    if(!Member){
        res.status(404).json({error:"No such Member Exist"})
    }

    res.status(200).json(Member)
}

const DeleteMember = async (req, res)=>{
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such Member Exis"})
    }

    const Member = await TeamModel.findOneAndDelete({_id:id})

    if(!Member){
        res.status(404).json({error:"No Such Member exist"})
    }

    res.status(200).json(Member)
}

module.exports= {
    GetSingleTeam,
    GetTeamMembers,
    PostMember,
    UpdateMember,
    DeleteMember,
    SendImg
}