import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";

const connectDB=async()=>{
    const DB_NAME="CropCare"
    console.log(process.env.MONGODB_URI)
    try {
        const connectionInstance=await mongoose.connect
        (`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MONGODB CONNECTION SUCCESFULL`,
        connectionInstance.connection.host);
        
    } catch (error) {
        console.log("MONGODB connection error",error)
        process.exit(1)
    }
}

 export default connectDB