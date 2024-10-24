import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../Models/User.js'

const middleware=async(req,res,next)=>{
    try{
    const token=req.headers.authorization.split(' ')[1]
    if(!token){
        return res.status(401).json({success:false,message:'Token Not Found..'})
    }
    const decoded=await jwt.verify(token,'noteapp@123');
    if(!decoded){
        return res.status(401).json({success:false,message:'Token Mismatch..'})
    }
    const user=await User.findById({_id:decoded.id})
    if(!user){
        return res.status(401).json({success:false,message:'User Not Found..'})
    }
    const newUser={name:user.name,id:user.id}
    req.user=newUser
    next()
}
catch(err){
    return res.status(401).json({success:false,message:'Please Login..'})
}
}

export default middleware;