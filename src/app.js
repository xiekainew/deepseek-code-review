import express from 'express';
import bodyParser from 'body-parser';
import { config } from './config/config.js';
import { ReviewController } from './controllers/review.controller.js';

// 获取配置
const {SERVER_PORT,} = config;

const app = express();
app.use(bodyParser.json());

// 代码审查端点
app.post('/node/code-review', async (req, res) => {
    try {
        const result = await ReviewController.handleCodeReview(req.body)
        
        res.json({
            status: 'success',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});


app.get('/node/health', (req, res) => {
    res.json({
        status: 'success',
        message: 'Node server is running'
    });
})


// 启动服务
app.listen(SERVER_PORT, () => {
    console.log(`Code review service running on port ${SERVER_PORT}`);
});