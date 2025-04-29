ChatGPT-Vue3 示例项目

一个基于 Vue3 + Vite 的前端和 Express 后端的 ChatGPT 聊天示例，目前只支持文字实时流式输出（SSE）
左侧菜单为假数据，模拟用户登录，记录会话内容等后续功能持续更新


目录结构
- **chatgpt-vue3/**
  - **server/**             
    - `.env.vue`           # 通义千问的 Key  
    - `index.js`           # Express 入口，SSE & 文件上传  
    - `package.json`       # 后端依赖与启动脚本  
  - **src/**                
    - **components/**      
      - `Sidebar.vue`      # 左侧会话列表  
      - `ChatHeader.vue`   # 会话头部  
      - `ChatArea.vue`      # 主聊天区  
      - `ChatInput.vue`     # 输入框 & 上传/文件按钮  
      - `ChatMessages.vue`  # 消息列表容器  
      - `ChatMessageItem.vue` # 单条消息气泡渲染  
    - `App.vue`            # 全局布局与状态管理  
    - `index.css`          # 全局样式  
    - `main.js`            # Vue3 + Vite 入口  
  - **public/**            # 静态资源（logo、图标 等）  
  - `package.json`         # 前端依赖与脚本  
  - `vite.config.js`       # Vite 配置（代理、打包）  


环境要求

Node.js >= 16

npm 或 yarn

快速启动

克隆仓库并安装依赖：

git clone <repo_url>
cd chatgpt-vue3
安装前端依赖
npm install
安装后端依赖
cd server
npm install
cd ..

配置key：server/.env
DASHSCOPE_API_KEY=你的通义千问的key


启动后端：
cd server
npm run start   # 或 node index.js

启动前端：
cd ..
npm run dev

访问 http://localhost:5173，开始聊天。



