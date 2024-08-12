import axios from "axios";
import dotenv from 'dotenv';
import OpenAI from "openai";
import fs from 'fs';
import csv from 'csv-parser';
import { recommandPoliciesResponseDTO, recommandsPoliciesResponseDTO, selfIntroduceResponseDTO } from "../dtos/gpt.dtos";
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL ='https://api.openai.com/v1/chat/completions';
const parseCSV = (filePath) => {
    return new Promise((resolve, reject) => {
        const policies = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                policies.push(row);
            })
            .on('end', () => {
                console.log('CSV 파일이 성공적으로 파싱되었습니다.');
                resolve(policies);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}
export const selfIntroduceCall = async (scriptText) => {
     
    try {
        const system_prompt = `You should revise the cover letter you received from the user.
        The json data received from the user is as follows.
        {
        {
        "Question": "Question of self-introduction",
        "limit": "Number of letters",
        "prompt": "Contents of the cover letter entered by the user"}
        }
        The result should be modified in the form of json data and provided in Korean for the result value. { "result": "modified cover letter",
        "comment": "comment on revised cover letter"}`;

        const prompt = JSON.stringify(scriptText);
        const response = await axios.post(
            OPENAI_API_URL,
            {
                model: "gpt-4o",
                messages: [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": prompt}
                ]
            },
            {
                headers: {  
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                }
            }
        );
        
        const generatedText = response.data.choices[0].message.content.trim();

        // 이스케이프 문자 제거 및 JSON으로 변환
        const sanitizedString = generatedText.replace(/[\u0000-\u001F\u007F-\u009F]/g, ''); // 제어 문자 제거
        console.log("특수문자 제거 이후",sanitizedString);
        const parsedJSON = JSON.parse(sanitizedString); // JSON 파싱

        console.log("gpt data", parsedJSON);
        return await selfIntroduceResponseDTO(parsedJSON, parsedJSON.result.length);
    } catch (error) {
       
        console.error('Error calling ChatGPT API:', error);
        throw error;
    }
}
const fixJSONResponse = (responseText) => {
    // "policies"라는 단어 이후부터 시작하도록 잘라냅니다.
    const startIndex = responseText.indexOf('{');
    if (startIndex === -1) {
      throw new Error('올바른 "policies" 필드가 없습니다.');
    }
    let jsonPart = responseText.substring(startIndex);
    
    // 마지막 "}"를 찾은 뒤 그 위치로 잘라냅니다.
    const endIndex = jsonPart.lastIndexOf('}');
    if (endIndex === -1) {
      throw new Error('올바른 JSON 형식의 끝을 찾을 수 없습니다.');
    }
    jsonPart = jsonPart.substring(0, endIndex + 1);
    
    return jsonPart;
  };
export const recommandPoliciesService= async(data)=>{
    const csvFilePath ='./src/csv/yongin.csv';
    try {
        const policies=await parseCSV(csvFilePath);

        const system_prompt = `You should recommend policies according to the information given. The list of policies is as follows:
Policy: ${JSON.stringify(policies)}

The user will provide information in the following format:
{
  "birthdate": "YYYY-MM-DD",
  "residence": "City or Area of Residence",
  "is_married": "true/false",
  "child_count": "number of children"
}

You should respond with a list of relevant policies in the following  only JSON data in korean:
{
  "policies": [
    {
      "name": "Policy name",
      "type": "Policy type",
      "startTime": "Start period",
      "endTime": "End period",
      "target": "Target group",
      "description": "Description of policy"
    }
  ]
}`;
        
        const prompt =JSON.stringify(data);
        const response = await axios.post(
            OPENAI_API_URL,
            {
                model: "gpt-3.5-turbo-16k",
                messages: [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": prompt}
                ]
            },
            {
                headers: {  
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                }
            });
            const generatedText = response.data.choices[0].message.content.trim();
            console.log(generatedText)
        // 이스케이프 문자 제거 및 JSON으로 변환
        const sanitizedString = generatedText.replace(/[\u0000-\u001F\u007F-\u009F]/g, ''); // 제어 문자 제거
        const fixedJSON = fixJSONResponse(sanitizedString);
        const parsedJSON = JSON.parse(fixedJSON); // JSON 파싱
        const policiesData=[]
        for(let i =0; i< parsedJSON.policies.length;i++){
            policiesData.push(await recommandPoliciesResponseDTO(parsedJSON.policies[i]));
        }
        console.log("gpt data", parsedJSON);
        return await recommandsPoliciesResponseDTO(policiesData);

    } catch (error) {
        console.error('request Data',)
        console.error('Error calling ChatGPT API:', error);
        throw error;
    }

    

}


