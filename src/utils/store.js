// 使用内存缓存 + 文件持久化
import { promises as fs } from 'fs';

export class FileCommitStore {
  constructor(filePath = './processed-commits.json') {
    this.filePath = filePath;
    this.cache = new Set();
    console.log('FileCommitStore init')
    this.init()
  }

async init() {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      console.log(222, data)
      this.cache = new Set(JSON.parse(data));
    } catch (error) {
      this.cache = new Set();
      console.log(2333, this.cache, error)
    }
  }

    isProcessed(sha) {
    console.log(this.cache, this.cache.has(sha))
    return this.cache.has(sha);
  }

   async markProcessed(sha) {
    console.log('markProcessed', sha)
    this.cache.add(sha);
    console.log('markProcessed this.cache', this.cache)
    await fs.writeFile(this.filePath, JSON.stringify([...this.cache]));
  }
}