import {http} from '../utils/http.js';


export class GiteeService {
    static async getCommitDiff(owner, repo, sha) {
        try {
            const response = await http.get(`https://gitee.com/api/v5/repos/${owner}/${repo}/commits/${sha}`);
            return response.data;
        } catch (error) {
            throw new Error(`Gitee API Error: ${error.message}`);
        }
    }

    static async postComment(owner, repo, sha, comment) {
        return http.post(`https://gitee.com/api/v5/repos/${owner}/${repo}/commits/${sha}/comments`, {
            body: comment
        });
    }
}
