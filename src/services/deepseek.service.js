import {http} from '../utils/http.js';
import { config } from '../config/config.js';

// 获取配置
const { DEEPSEEK_URL, DEEPSEEK_API_KEY, MODEL, FE_CONTENT } = config;

export class DeepseekService {
    static async getComment(diff) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + DEEPSEEK_API_KEY, // 替换为真实API Key
        };
    
        const data = {
            model: MODEL,
            max_tokens: 4096,
            messages: [
                {
                    "role": "system",
                    "content": FE_CONTENT
                },
                { role: "user", content: `请在专业的角度下review这部分代码变更：${diff}` },
    
            ],
            stream: false,
            temperature: 1.0
        };
    
    
        const response = await http.post(DEEPSEEK_URL, data, { headers });
    
        return response.data.choices[0].message.content   
    }

}
