import PQueue from 'p-queue';
import { GiteeService } from '../services/gitee.service.js';
import { config } from '../config/config.js';
import { DeepseekService } from '../services/deepseek.service.js';
import {FileCommitStore} from '../utils/store.js'
console.log(FileCommitStore)

const commitStore = new FileCommitStore()

const {reviewQueueConfig, EXTENSIONS} = config;

export class ReviewController {
  static async handleCodeReview(reqBody) {
    const { commits, repository } = reqBody;
    const owner = repository.namespace;
    const repo = repository.name;

    const reviewQueue = new PQueue(reviewQueueConfig);

    for (const commit of commits) {
        console.log(443, commitStore.isProcessed(commit.id))
        if (commitStore.isProcessed(commit.id)) {
            continue;
        }

      const diff = await GiteeService.getCommitDiff(owner, repo, commit.id);
      console.log(`diff: ${JSON.stringify(diff)}`)
      if (!diff?.files) continue;

      const tasks = diff.files
        .filter(file => this._filterFileTypes(file.filename))
        .map(file => this._createReviewTask(owner, repo, commit.id, file));

      reviewQueue.addAll(tasks);
    }

    await reviewQueue.onIdle();
    return { message: '评论任务已全部提交处理' };
  }

  static _filterFileTypes(filename = '') {
    const extension = filename.slice(filename.lastIndexOf('.')).toLowerCase();
    const ALLOWED_EXTENSIONS = new Set(EXTENSIONS);
    return ALLOWED_EXTENSIONS.has(extension);
  }

  static _createReviewTask(owner, repo, commitId, file) {
    return async () => {
      try {
        console.log(`开始处理文件：${file.filename}`, file.patch);

        const reviewResult = await DeepseekService.getComment(file.patch);
        commitStore.markProcessed(commitId);
        await GiteeService.postComment(owner, repo, commitId, reviewResult);
      } catch (error) {
        console.error(`文件 ${file.filename} 处理失败:`, error.message);
        throw error;
      }
    };
  }
}