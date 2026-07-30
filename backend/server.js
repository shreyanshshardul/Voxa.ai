import OpenAI from "openai";
import "dotenv/config";
import useRoute from "./routes/chat.route.js";
import mongoose from "mongoose";


import express from "express";
import cors from "cors";


const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());

(async()=>{
    try{

       if (!process.env.DB_CONNECTION) {
      console.log("❌ DB_CONNECTION environment variable not found!");
      process.exit(1);
    }
       await mongoose.connect(process.env.DB_CONNECTION);
   console.log(" DB Connected successfully");

   app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
    }catch(err){
      console.log("Failed to start the server");
      console.log(err);
      process.exit(1);
    }
})();

app.use("/api/v1" , useRoute);