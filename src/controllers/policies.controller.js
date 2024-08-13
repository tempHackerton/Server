import { BaseError } from "../../config/error.js";
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { getAlarmService, readAlarmService, sendAlarmService } from "../services/policies.js";


export const sendAlarmController= async(req,res)=>{

    try {
        res.send(response(status.SUCCESS, await sendAlarmService(req.body.id,1)));
    } catch (error) {
        console.error(error);
        res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}

export const readAlarmController = async(req,res)=>{

    try {
        res.send(response(status.SUCCESS,await readAlarmService(req.body.id,1)))
    } catch (error) {
        console.error(error);
        res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}

export const getAlarmController = async(req,res)=>{
    try {
        res.send(response(status.SUCCESS,await getAlarmService(1)))
    } catch (error) {
        console.error(error);
        res.send(response(status.INTERNAL_SERVER_ERROR));
    }

}
