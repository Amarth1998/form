import mongoose from "mongoose";
import colors from 'colors'
const connectDB = async()=>{
    try {
        const  conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB Connected: ${conn.connection.host}`.bgGreen.underline)

    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline)
        
    }
}

export default connectDB 