import mongoose from "mongoose";

const connectMongoDb=async ()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/notedb');
        console.log('db connected')
    }
    catch(err){
        console.log('db connection failed',err.message)
    }
}

export default connectMongoDb;