import express from 'express'
import middleware from '../middleware/middleware.js'
import Note from '../Models/NoteModel.js'

const noterouter=express.Router()
noterouter.post('/add',middleware,async(req,res)=>{
    try{
    const {title,description}=req.body
    const noteApp=new Note({
        title:title,
        description:description,
        userId:req.user.id
    })
    await noteApp.save()
    console.log(req)
    return res.status(200).json({success:true,message:'Note Added'})
    
    }
    catch(err){
        return res.status(401).json({success:false,message:'Note Failed..'})
    }
})
noterouter.get('/',middleware,async(req,res)=>{
    try{
        const notes=await Note.find({userId:req.user.id})
        return res.status(200).json({success:true,notes})
    }
    catch(err){
        return res.status(401).json({success:false,message:'Notes Not Found..'})
    }
})

noterouter.put('/:id',async(req,res)=>{
    try{
        const {id}=req.params
        const notes=await Note.findByIdAndUpdate(id,req.body)
        return res.status(200).json({success:true,notes})
    }
    catch(err){
        return res.status(401).json({success:false,message:'Notes Not Found..'})
    }
})

noterouter.delete('/:id',async(req,res)=>{
    try{
        const {id}=req.params
        const notes=await Note.findByIdAndDelete(id)
        return res.status(200).json({success:true,notes})
    }
    catch(err){
        return res.status(401).json({success:false,message:'Notes Not Found..'})
    }
})
export default noterouter;