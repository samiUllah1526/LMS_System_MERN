require('dotenv').config()
import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        const DB_URI = process.env.DB_URI
        if(!DB_URI) throw Error("evn variable DB_URI is not provided")
        const data = await mongoose.connect(DB_URI);
        console.log(`Database connected with host: ${data.connection.host}`)
    } catch (error: any) {
        console.log(`Error occured while connecting database  ${error.message}`)
    }
}