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
const { info } = require("console");

// import custom functions

// const connectDB= require('./services/db')

// import environmental variables into the application
dotenv.config();

const PORT = process.env.PORT || 5000;

// initialize an express instance






// specifiy what middlwares we are going to use


// establish a connection wiht the database

// const db = mongoose.connection;

// let gfs;
// db.once("open", function() {
//   gfs = Grid(db.db, mongoose.mongo);
// });


//  connectDB()

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
  gfs.collection('media')
});
// create a stream connection with our cluster
// const gfs =  Grid(conn.db,mongoose.mongo)

//name of the bucket where media is going to be retrieved
// gfs.collection('media')



// secifying a storage location in our cluster for multer
let infos=[
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
          bucketName: 'media',
          metadata:infos
        };
        return resolve(fileInfo);
      });
    });
  }
});

// inializing our multer storage
const upload = multer({ storage });

const PostVideo= (req,res)=>{
  const file=req.file

  const Info=req.body

  infos.pop(Info)

  infos.push(Info)
  const obj={
    file,
    infos
  }

 res.json(obj)
}

// route for fetching all the files from the media bucket

const getVideo=async(req,res)=>{
try{
  const files =await gfs.files.find().toArray()

  res.json(files)

}catch(err){
  res.status(400).send(err)
}
 
  
}
// route for streaming a file
const GetOne=async(req,res)=>{

  const{filename}= req.params
  try{
    const readstream = await gfs.createReadStream({filename})

    readstream.pipe(res)
  }catch(err){
    res.status(400).send(err)
  }

}
// route for deleting a file
const deleteOne=async(req,res)=>{
  const{filename}=req.params
  try{
  
  await gfs.files.remove({filename})
   
    res.status(200).end()
  }catch(err){
    res.status(400).send(err)
  }
}





module.exports={
    GetOne,
    PostVideo,
    getVideo,
    deleteOne,
    upload
}



// serves the application at the defined port
