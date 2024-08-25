import express from "express"
import colors from "colors"
import dotenv from "dotenv"
import morgan from "morgan"  //this is used in debug
import connectDB from "./config/db.js";  //import db.js

import authRoutes  from "./routes/authRoute.js" 
const app=express()  

import cors from 'cors'
dotenv.config(); //configure env
connectDB(); //database function call
app.use(cors())  //enable cors



//middleware 
app.use(express.json()) //used to send json , used in post method
app.use(morgan('dev'))


app.get("/",(req,res)=>{res.send("amarth")})

//routes
app.use('/api/v1/auth',authRoutes) 


const PORT=process.env.PORT || 8080     //PORT

app.listen(PORT,()=>{console.log(`server running on ${process.env.DEV_MODE} on port  ${PORT}`.bgGreen)}) 


