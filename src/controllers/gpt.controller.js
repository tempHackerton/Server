import { BaseError } from "../../config/error.js";
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { recommandPoliciesService, selfIntroduceCall } from "../services/gpt.service.js";

export const selfIntroduceController= async(req,res)=>{

    try {
        res.send(response(status.SUCCESS, await selfIntroduceCall(req.body)));
    } catch (error) {
        console.error(error);
        res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}

export const recommandPoliciesController = async(req,res)=>{
    try {
        res.send(response(status.SUCCESS, await recommandPoliciesService(req.body)));
    } catch (error) {
        console.error(error);
        res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}