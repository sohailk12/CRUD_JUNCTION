import mongoose from "mongoose"

export const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/Portal');
        console.log(`Connection Successfull: ${conn.connection.host}`);
    } catch (error) {
        console.log(error.message);
    }
} 
