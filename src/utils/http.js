import axios from 'axios';

import { config } from '../config/config.js';

const {GITEE_TOKEN, API_TIMEOUT} = config

// 创建共享的axios实例
export const http = axios.create({
    headers: {
        Authorization: 'Bearer ' + GITEE_TOKEN
    },
    timeout: API_TIMEOUT
});

