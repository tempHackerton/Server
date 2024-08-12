import express from "express";
import { selfIntroduceController } from "../controllers/gpt.controller";

export const gptRoute=express.Router();

gptRoute.post('/selfIntroduce',async(req,res)=>{
    const result = await selfIntroduceController(req,res)
})