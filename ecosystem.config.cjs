module.exports = {
    apps: [{
      name: "app",
      script: "./src/app.js",
      instances: "max",        // 使用所有 CPU 核心
      exec_mode: "fork",   // 集群模式 fork cluster
      env: {
        NODE_ENV: "production",
      },

      merge_logs: true,
    }]
  };