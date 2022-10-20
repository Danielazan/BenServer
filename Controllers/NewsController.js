const mongoose= require("mongoose")
// const { default: News } = require("../../bensite/src/components/News/News")
const NewsModel = require("../Models/NewsModel")



// post News

const PostNews= async (req,res)=>{

    const {title,News}=req.body

    try {
        const createNews = await NewsModel.create({title, News})
        res.status (200).json(createNews)
    }

    catch (error){
        if(error){
            res.status(400).json({error:error.message})
        }
    }
}

// Get A Single News

const GetSingle = async (req, res)=>{
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such news Exist"})
    }

    const News = await NewsModel.findById(id)

    if (!News){
        res.status(404).json({error:"No such News Exist"})
    }

    res.status(200).json(News)
}

// Get All news

const GetNews = async (req, res)=>{
    const News = await NewsModel.find({}).sort({createdAt:-1})

    res.status(200).json(News)
}

const DeleteNews = async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Information does not Exist'})
    }

    const News = await NewsModel.findOneAndDelete({_id:id})

    if(!News){
        return res.status(400).json({error:"Information does not Exist"})
    }
    res.status(200).json(News)
}

const UpdateNews= async (req,res)=>{
    const {id}= req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json(
            {error:"Such News does not exist"}
        )
    }
    const News = await NewsModel.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if (!News){
        return res.status(400).json({error:'No such Information Exist'})
    }

    res.status(200).json(News)
}

module.exports = {PostNews,
GetNews, DeleteNews, UpdateNews,
GetSingle
}

