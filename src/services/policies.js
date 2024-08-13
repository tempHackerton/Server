import { getAlarmDao, getPoliciesDao, isNewDataDao, readAlarmDao, sendAlarmDao } from "../models/dao/policies.dao";

export const collectPolicies= async()=>{
    //매주 월요일 정책 사이트를 뒤져 크롤링한다.
    const data=crawlingPolicies();
    //크롤링한 데이터를 검사하면서 기존 데이터인지 신 데이터인지 확인한다.
    for(let i =0; i< data.length;i++){
        if(isNewData(data[i])){

            sendAlarmService(data[i]);
        }else{
            break;
        }
    }
}

async function crawlingPolicies() {
    try {
        const url ="https://www.yongin.go.kr/home/www/www01/www01_09/www01_09_01/www01_09_01_02.jsp;jsessionid=L4SpsGaN7gDxZGKfSIyeJi8Ro7Cj3iP329Ed11xsUFtXGtrxbEbKDkccsvpf1w0B.yonginwas_servlet_engine3"
        // 웹페이지의 HTML을 가져오기
        const  html  = await axios.get(url);
        console.log(html.data);
        // Cheerio로 HTML 파싱
        const $ = cheerio.load(html.data);

        // 텍스트를 저장할 배열
        const policies = [];

        // box_review 클래스를 가진 div 요소들을 순회
        $('.box_review').each((index, element) => {
            // tit_view 클래스의 텍스트 가져오기
            const titViewText = $(element).find('.tit_view').text().trim();

            // 텍스트가 있으면 배열에 저장
            if (titViewText) {
                policies.push(titViewText);
            }
        });

        return policies;

    } catch (error) {
        
        return {};
    }

    
}

async function isNewData(data) {
    if(isNewDataDao(data)){
        return false;
    }else{
        return true;
    }
    
}

export const sendAlarmService=async (data,user_id)=>{
    console.log("인간",data)
    const sendAlarmData= await sendAlarmDao(data,user_id);
    return "success";

}

export const readAlarmService = async(data,user_id)=>{
    const readAlarmData = await readAlarmDao(data,user_id);
}
export const getAlarmService = async(user_id)=>{
    const getAalrmData= await getAlarmDao(user_id);
    const AlarmData=[]
    for(let i=0; i<getAalrmData.length;i++){
        const policiesData = await getPoliciesDao(getAalrmData[i].policy_id);
        console.log("넘겨진 데이터",policiesData[0])
        AlarmData.push({
            "id":getAalrmData[i].policy_id,
            "created_at":getAalrmData[i].created_at,
            "is_read":getAalrmData[i].is_read,
            "policy_id":policiesData[0][0].id,
            "name":policiesData[0][0].name,
            "type":policiesData[0][0].type,
            "startTime":policiesData[0][0].startTime,
            "endTime":policiesData[0][0].endTime,
            "target":policiesData[0][0].target,
            "description":policiesData[0][0].description

        })
    }
    return AlarmData;
    
}