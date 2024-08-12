import express from "express";
import { selfIntroduceController,recommandPoliciesController } from "../controllers/gpt.controller";

export const gptRoute=express.Router();

gptRoute.post('/selfIntroduce',async(req,res)=>{
    const result = await selfIntroduceController(req,res)
})

gptRoute.post('/recommendPolicies',async(req,res)=>{
    const result = await recommandPoliciesController(req,res)
})