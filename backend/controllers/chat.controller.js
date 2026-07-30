import {asyncHandler} from "../utils/asyncHandler.js";
import Thread from "../models/thread.model.js";
import OpenRouterApiResponse from "../utils/OpenRouter.js"


const test = asyncHandler(async(req,res)=>{
    const {message} = req.body;
    if(!message){
        return res.status(404).json({message:"No message found" , success:false})
    }
    const response = await OpenRouterApiResponse(message);
    res.send(response);
    console.log(response);
    return res.status(200).json();
})

const thread = asyncHandler(async(req,res)=>{
    //most recent data top pe aana chahiye like descending order.
    const threads = await Thread.find({}).sort({updatedAt:-1});
    if(!thread){
        console.log("failed to fetch all threads");
        return res.status(409).
        json({message:"Failed to fetch all threads" , success:false});
    }
    res.json(threads);
    return res.status(200)
    .json({message:"All chats fetched successfully" , success:true});
    
})
const threadId = asyncHandler(async(req,res)=>{
    const {threadId} = req.params;
    const thread = await Thread.findOne({threadId})
    if(!thread){
        console.log("Unable to fetch chat!");
        return res.status(400).json({message:"Unable to fetch all chats" , success:false});
    }
    res.json(thread.messages);
    return res.status(200).json({message:"Chat fetched successfully" , success:true});
})

const deleteThread = asyncHandler(async(req,res)=>{
    const {threadId} = req.params;
    const thread = await Thread.findOneAndDelete({threadId});
    if(!thread){
        return res.status(404).json({message:"Fail to delete" , success:false})
    }
    return res.status(201).json({message:"delete successfully" , success:true})

})

const chat = asyncHandler(async(req,res)=>{
    let {threadId , message} = req.body;
    if(!threadId || !message){
        return res.status(404).json({message:"Fields are missing" , success:false})
    }
    let thread = await Thread.findOne({threadId});
    if(!thread){
        //create new thread in DB
        thread = new Thread({
            threadId,
            title:message,
            messages : [{role:"user" , content : message}]

     } );
    }
    else{
        thread.messages.push({role:"user" , content : message})
    }
    const assistantReply = await OpenRouterApiResponse(message);
    thread.messages.push({role:"assistant" , content:assistantReply});
    await thread.save({ validateBeforeSave: false });
    console.log(thread.title);
     res.json({reply:assistantReply});
})
export {test , thread , threadId , deleteThread , chat};