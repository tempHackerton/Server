import express from "express";
import { selfIntroduceController,recommandPoliciesController, interviewrController, interviewResultController } from "../controllers/gpt.controller";

export const gptRoute=express.Router();

gptRoute.post('/selfIntroduce',async(req,res)=>{
    const result = await selfIntroduceController(req,res)
})

gptRoute.post('/recommendPolicies',async(req,res)=>{
    const result = await recommandPoliciesController(req,res)
})

gptRoute.post('/interview',async(req,res)=>{
    const result = await interviewrController(req,res);
})

gptRoute.post('/interview/result',async(req,res)=>{
    const result =await interviewResultController(req,res);
})