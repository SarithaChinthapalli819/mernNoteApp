import mongoose, { mongo } from "mongoose";

const noteModel=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    userId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User'
    }
})

const Note=mongoose.model('Note',noteModel)
export default Note;