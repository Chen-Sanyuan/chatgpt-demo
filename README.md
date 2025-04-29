ChatGPT-Vue3 示例项目

一个基于 Vue3 + Vite 的前端和 Express 后端的 ChatGPT 聊天示例，目前只支持文字实时流式输出（SSE）
左侧菜单为假数据，模拟用户登录，记录会话内容等后续功能持续更新


目录结构

chatgpt-vue3/
├─ server/             # 后端代码
├─ ├─ .env.vue         # 通义千问的key
│  └─ index.js         # Express 入口，SSE & 文件上传
│ 
├─ src/                # 前端代码
│  ├─ components/
│  │  ├─ Sidebar.vue   # 左侧会话列表
│  │  ├─ ChatHeader.vue# 会话头部
│  │  ├─ ChatArea.vue  # 主聊天区
│  │  ├─ ChatInput.vue # 输入框 & 上传按钮
│  │  └─ ChatMessages.vue / ChatMessageItem.vue  # 消息渲染
│  ├─ App.vue          # 布局与状态管理
│  ├─ index.css        # 全局样式
│  └─ main.js          # Vue3 + Vite 入口
├─ public/             # 静态资源（logo、图标）
├─ package.json        # 前端依赖与脚本
├─ server/package.json # 后端依赖与启动脚本
└─ vite.config.js      # Vite 配置（代理、打包）

环境要求

Node.js >= 16

npm 或 yarn

快速启动

克隆仓库并安装依赖：

git clone <repo_url>
cd chatgpt-vue3
# 安装前端依赖
npm install
# 安装后端依赖
cd server
npm install
cd ..

配置环境变量：
# server/.env
DASHSCOPE_API_KEY=你的通义千问的key


启动后端：

cd server
npm run start   # 或 node index.js

启动前端：

cd ..
npm run dev

访问 http://localhost:5173，开始聊天。



