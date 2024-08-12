import axios from "axios";
import dotenv from 'dotenv';
import OpenAI from "openai";
import { selfIntroduceResponseDTO } from "../dtos/gpt.dtos";
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL ='https://api.openai.com/v1/chat/completions';

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

        // 이스케이프 문자 제거
        const cleanString = generatedText.replace(/\\"/g, '"');
        
        // JSON으로 변환
        const parsedJSON = JSON.parse(cleanString);
        
        console.log("gpt data", parsedJSON);
        return await selfIntroduceResponseDTO(parsedJSON,parsedJSON.result.length);
    } catch (error) {
        console.error('Error calling ChatGPT API:', error);
        throw error;
    }
}