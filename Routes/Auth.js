import mongoose from "mongoose";
import express from 'express'
import User from "../Models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import middleware from "../middleware/middleware.js";
import nodemailer from 'nodemailer';
import { useParams } from 'react-router-dom';
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email })
        if (user) {
            return res.status(401).json({ success: false, message: 'registration failed' })
        }

        const hashpassword = await bcrypt.hash(password, 10)

        const newUser = new User({ name, email, password: hashpassword })
        await newUser.save()
        return res.status(200).json({ success: true, message: 'registration successed' })


    }
    catch(err) {
        console.log(err)
        return res.status(401).json({ success: false, message: 'registration failed due to error' })
        
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        const checkpassword=await bcrypt.compare(password,user.password)
        if (!user) {
            return res.status(401).json({ success: false, message: 'No User Found' })
        }

        if(!checkpassword){
            return res.status(401).json({ success: false, message: 'Password Doenot Match' })
        }
        const token=jwt.sign({id:user._id},'noteapp@123',{expiresIn:'30h'})
        return res.status(200).json({ success: true,token,user:{name:user.name}, message: 'Login Successed' })

    }
    catch(err) {
        console.log(err)
        return res.status(401).json({ success: false, message: 'Login failed due to error' })
    }
})

router.get('/verify',middleware,async(req,res)=>{
    try{
        const name=req.user.name
        return res.status(200).json({success:true,name})
    }
    catch(err){
        return res.status(401).json({success:false,message:'Notes Not Found..'})
    }
})


router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email })
        if(!user){
            return res.status(401).json({ success: false, message: 'email incorrect' })
        }
        const token=jwt.sign({id:user._id},'noteapp@123',{expiresIn:'10h'})
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'chinthapallisaritha5555@gmail.com',
              pass: 'vicy flnr gkbe cqmw'
            }
          });
          
          var mailOptions = {
            from: 'chinthapallisaritha5555@gmail.com',
            to: `${email}`,
            subject: 'Request for Note App Password Reset...',
            text: `http://localhost:5173/reset-password/${user._id}/${token}`
          };
          console.log(mailOptions)
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          return res.status(200).json({ success: true, token:token,message: 'Email sent succesfully to Reset Pawword' })
    }
    catch(err) {
        console.log(err)
        return res.status(401).json({ success: false, message: 'Login failed due to error' })
    }
})

router.post('/reset-password/:id/:token', middleware,async (req, res) => {
    try{
    const {id}=req.params
    const {password}=req.body;
    const update=await User.findByIdAndUpdate({_id:id},{password:await bcrypt.hash(password,10)})
    return res.status(200).json({success:true,update})
    }
    catch(err){
        return res.status(401).json({success:false,message:'Reset Failed..'})
    }
});

export default router;