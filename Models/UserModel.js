const mongoose = require("mongoose")

const bcrypt = require("bcrypt")

const validator =require("validator")

const schema = mongoose.Schema

const UserSchema= new schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
})

UserSchema.statics.login = async function(email,password){
    if(!email || !password){
        throw Error ("All fields must be filled")
    }

    const user= await this.findOne({email})
    
    if(!user){
        throw Error ("incorrect Email")
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error("incorrect password")
    }

    return user
}
UserSchema.statics.signup = async function (email, password){
    if(!email || !password){
        throw Error ("All fields must be filled")
    }

    if(!validator.isEmail(email)){
        throw Error("Email is not valid")
    }

    if(!validator.isStrongPassword(password)){
        throw Error ("password is not strong enough")
    }

    const exist = await this.findOne({email})

    if(exist){
        throw Error("Email already exist")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const User = await this.create({email, password:hash})

    return User
}

module.exports=mongoose.model('Users', UserSchema)