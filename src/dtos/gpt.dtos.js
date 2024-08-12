export const selfIntroduceResponseDTO=async (req,limit)=>{
    console.log("dto로 돌아온 데이터",req);
    return{
        "content":req.result,
        "comment":req.comment,
        "limit":limit
    }
}