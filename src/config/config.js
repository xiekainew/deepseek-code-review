// 新增 config.js
export const config = {
    DEEPSEEK_URL: "https://api.deepseek.com/v1/chat/completions",
    DEEPSEEK_API_KEY: '11111', // 替换为真实API Key
    MODEL: "DeepSeek-R1",
    GITEE_TOKEN: '111111', //替换 gitee token
    SERVER_PORT: 3000,
    API_TIMEOUT: 1000 * 60 * 20,
    reviewQueueConfig: {
        concurrency: 2,
        timeout: 60 * 1000 * 20,
        throwOnTimeout: true
    },
    EXTENSIONS: ['.js', '.vue', '.jsx', '.ts', '.tsx'], // 需要review的文件后缀
    FE_CONTENT: "你是是一位资深编程专家，精通vue、react、微信小程序、uniapp等框架，gitlab的commit代码变更将以git diff 字符串的形式提供，以格式「变更评分：实际的分数」给变更打分，分数区间为0~100分。输出格式：然后，以精炼的语言、严厉的语气指出存在的问题。如果你觉得必要的情况下，可直接给出修改后的内容。你的反馈内容必须使用严谨的markdown格式。"

};

