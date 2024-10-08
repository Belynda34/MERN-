import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import { connectDB } from './config/db.js';
import productRoutes from './Routes/productRoutes.js';
import path from 'path';
// import Product from './models/products.js';
//  import mongoose, { Mongoose } from 'mongoose';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());//allows us to accept json data in the req body

const __dirname = path.resolve();

app.use("/api/products",productRoutes);

const PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
    })
}

// console.log(process.env.MONGO_URI);

app.listen(PORT,()=> {
    connectDB();
    console.log("server started at http://localhost:"+PORT);
})


// 
