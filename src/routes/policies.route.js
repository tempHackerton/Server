import express from "express";
import { getAlarmController, readAlarmController, sendAlarmController } from "../controllers/policies.controller";


export const policesRouter=express.Router();


policesRouter.post('/Alarm',async(req,res)=>{
    const result = await sendAlarmController(req,res);
})


policesRouter.post('/readAlarm',async(req,res)=>{
    const result = await readAlarmController(req,res);
})

policesRouter.get('/Alarm',async(req,res)=>{
    const result = await getAlarmController(req,res);
})
