// import the packages
const express = require("express");

const dotenv = require('dotenv');

const mongoose = require('mongoose')

//serving and storing media

const crypto = require('crypto') // <---- built-in nodejs package
const path = require('path')
const {GridFsStorage} = require('multer-gridfs-storage')
const multer = require('multer')
const Grid = require('gridfs-stream');

dotenv.config();

const PORT = process.env.PORT || 5000;

// initialize an express instance


//GridFS & Multer
const url ="mongodb+srv://Eagle:Eagle@lazan.o3kukpu.mongodb.net/Bensite?retryWrites=true&w=majority"

const conn = mongoose.createConnection(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

let gfs;
conn.once("open", function() {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('Gallery')
});
// create a stream connection with our cluster
// const gfs =  Grid(conn.db,mongoose.mongo)

//name of the bucket where media is going to be retrieved
// gfs.collection('media')



// secifying a storage location in our cluster for multer
let Tags=[
  {"example":"Example contect"}
]
const storage =   new GridFsStorage({
  url: url,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename =
          buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename,
          bucketName: 'Gallery',
          metadata:Tags
        };
        return resolve(fileInfo);
      });
    });
  }
});

// inializing our multer storage
const upload = multer({ storage });

const PostGallary= (req,res,next)=>{
  const file=req.file

  const Info=req.body

  Tags.pop(Info)

  Tags.push(Info)

//   if(!file){
//     const error = new Error("please uploaad pics")
//     return next(error)
//   }
  const obj={
    file,
    Tags
  }

 res.status(200).json(obj)
}

// route for fetching all the files from the media bucket

const getGallary=async(req,res)=>{
try{
  const files =await gfs.files.find().toArray()

  res.json(files)

}catch(err){
  res.status(400).send(err)
}
 
  
}
// route for streaming a file
const GetPic=async(req,res)=>{

  const{filename}= req.params

  

  try{
    if(!filename){
        res.status(400).json({error:"No such picture exist"})
      }

    const readstream = await gfs.createReadStream({filename})

    readstream.pipe(res)
  }catch(err){
    res.status(400).json(err)
  }

}
// route for deleting a file
const deletePic=async(req,res)=>{
  const{filename}=req.params
  try{
  
  await gfs.files.remove({filename})
   
    res.status(200).end()
  }catch(err){
    res.status(400).send(err)
  }
}





module.exports={
    GetPic,
    PostGallary,
    getGallary,
    deletePic,
    upload
}



// serves the application at the defined port
