import express from 'express'
import mongoose from 'mongoose'
import connectMongoDb from './Db/db.js'
import router from './Routes/Auth.js'
import cors from 'cors'
import noterouter from './Routes/Note.js'

const app=express()
app.use(cors())
app.use(express.json())
app.use('/api/auth',router)
app.use('/api/note',noterouter)

app.listen(5000,()=>{
    console.log('server connected')
    connectMongoDb();
})