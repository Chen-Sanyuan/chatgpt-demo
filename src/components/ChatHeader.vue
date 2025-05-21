<!-- src/components/ChatHeader.vue -->
<template>
  <header class="chat-header">
    <!-- 左侧标题 -->
    <h2 class="chat-title">chatgpt-demo</h2>

    <!-- 右侧用户图标 -->
    <div class="user-menu-trigger" @click="toggleMenu">
      <img src="/user.png" alt="User" class="user-icon" />
    </div>
  </header>
</template>

<style scoped>
  .chat-header {
    width: 100%;                      /* 撑满容器宽度 */
    display: flex;
    align-items: center;
    justify-content: space-between;   /* 左右贴两端 */
    padding: 16px 24px;               /* 水平留点内边距 */
    border-bottom: 1px solid #374151; /* 底部细线 */
    box-sizing: border-box;
  }

  .chat-title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: #f9fafb;
  }

  .user-menu-trigger {
    position: relative;
  }

  .user-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    display: block;
  }
</style>
