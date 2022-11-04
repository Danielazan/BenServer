const User = require("../Models/UserModel")

const jwt = require("jsonwebtoken")

// creating a reiseable function to generate JWT

const createToken = (_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'1d'})
}

const loginUser= async(req,res)=>{
    const {password, email}=req.body

    try{
        const user = await User.login(email,password)

        const token= createToken(user._id)

        res.status(200).json({email,token})
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

const signup= async(req,res)=>{
    const {email,password} = req.body

    try{
        const user =await User.signup(email, password)

        const token =createToken(user._id)

        res.status(200).json({email,token})
    }
    catch(error){
        res.status(400).json({error:error.message})
    }

    
}

module.exports={signup, loginUser}