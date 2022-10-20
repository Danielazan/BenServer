// import mongoose for use
const mongoose = require('mongoose')

/* we create a function that will establish a connection with our 
MongoDB Cluster
*/
const connectDB = async()=>{
    try{
        await mongoose.connect("mongodb+srv://Eagle:Eagle@lazan.o3kukpu.mongodb.net/Bensite?retryWrites=true&w=majority")
    }catch(err){
      
        process.exit(1)
    }
}   

module.exports=connectDB