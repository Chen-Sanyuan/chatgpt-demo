<!-- src/App.vue -->
<template>
  <div id="app">
    <!-- 左侧：历史会话列表 -->
    <aside class="sidebar-wrapper">
      <Sidebar
        :sessions="sessions"
        :current-session-id="currentSessionId"
        @select-session="selectSession"
      />
    </aside>

    <!-- 右侧：聊天主区 -->
    <main class="main-wrapper">
      <ChatArea :session-id="currentSessionId" />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import ChatArea from './components/ChatArea.vue'

// 假的会话数据
const sessions = ref([
  // 今天
  { id: '1',  title: '项目 Kickoff 会议',      createdAt: '2025-04-28T08:00:00Z' },
  { id: '2',  title: '新特性讨论',            createdAt: '2025-04-28T09:30:00Z' },
  { id: '3',  title: 'API 集成测试',          createdAt: '2025-04-28T11:15:00Z' },
  { id: '4',  title: '紧急 Bug 修复',         createdAt: '2025-04-28T13:45:00Z' },
  { id: '5',  title: 'UI 组件优化',           createdAt: '2025-04-28T15:20:00Z' },
  { id: '6',  title: '性能测试数据',          createdAt: '2025-04-28T17:05:00Z' },

  // 昨天
  { id: '7',  title: '后端接口对接',          createdAt: '2025-04-27T09:00:00Z' },
  { id: '8',  title: '文档编写规范',          createdAt: '2025-04-27T10:20:00Z' },
  { id: '9',  title: '代码审查',              createdAt: '2025-04-27T14:50:00Z' },
  { id: '10', title: '发布版本 v1.2',         createdAt: '2025-04-27T18:30:00Z' },

  // 前 7 天（4/22–4/26）
  { id: '11', title: '市场调研报告',          createdAt: '2025-04-26T16:00:00Z' },
  { id: '12', title: '依赖库升级',            createdAt: '2025-04-25T12:30:00Z' },
  { id: '13', title: '数据库备份',            createdAt: '2025-04-25T08:50:00Z' },
  { id: '14', title: '运维日志分析',          createdAt: '2025-04-24T13:15:00Z' },
  { id: '15', title: '安全加固策略',          createdAt: '2025-04-23T19:45:00Z' },
  { id: '16', title: '网络策略更新',          createdAt: '2025-04-22T21:10:00Z' },

  // 更早
  { id: '17', title: '用户反馈整理',          createdAt: '2025-04-21T10:30:00Z' },
  { id: '18', title: 'CI/CD 配置',            createdAt: '2025-04-20T14:00:00Z' },
  { id: '19', title: '跨域问题排查',          createdAt: '2025-04-19T08:45:00Z' },
  { id: '20', title: '版本回滚方案',          createdAt: '2025-04-18T11:20:00Z' },
  { id: '21', title: '文档补充',              createdAt: '2025-04-15T13:35:00Z' },
  { id: '22', title: '技术分享会',            createdAt: '2025-04-10T16:50:00Z' },
  { id: '23', title: '团队月度例会',          createdAt: '2025-03-30T09:15:00Z' },
  { id: '24', title: '版本发布v1.0',          createdAt: '2025-03-25T14:25:00Z' },
  { id: '25', title: '需求评审',              createdAt: '2025-03-10T08:00:00Z' },
])
const currentSessionId = ref(sessions.value[0].id)

// 点击侧边栏项时切换会话
function selectSession(id) {
  currentSessionId.value = id
}
</script>

<style>

/* 最外层 flex 布局 */
#app {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* 左侧容器：固定宽度，不收缩，可滚动 */
.sidebar-wrapper {
  width: 250px;            
  flex-shrink: 0;          /* 不允许 flex 收缩 */
  border-right: 1px solid #ccc;
  overflow-y: auto;
}

/* 右侧主区：剩余空间，column 布局 */
.main-wrapper {
  flex: 1;                 /* 占满剩余宽度 */
  display: flex;
  flex-direction: column;
}
</style>
