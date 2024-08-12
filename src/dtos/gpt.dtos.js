export const selfIntroduceResponseDTO=async (req,limit)=>{
    console.log("dto로 돌아온 데이터",req);
    return{
        "content":req.result,
        "comment":req.comment,
        "limit":limit
    }
}

export const recommandsPoliciesResponseDTO = async (req)=>{

    return {
        "policies":req
    }
}

export const recommandPoliciesResponseDTO = async (req)=>{

    return {
        "name" : req.name,
        "type" : req.type,
        "startTime": req.startTime,
        "endTime" : req.endTime,
        "target" : req.target,
        "description": req.description
    }
}