<template>
  <div :class="['message-item', message.role]">
    <div class="bubble">
      {{ message.content }}
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  message: {
    type: Object,
    required: true,
    // { role: 'user'|'assistant', content: string }
  }
})
</script>

<style scoped>
.message-item {
  display: flex;
}

/* 用户消息靠右 */
.message-item.user {
  justify-content: flex-end;
}

/* AI 回复靠左 */
.message-item.assistant {
  justify-content: flex-start;
}

.bubble {
  max-width: 60%;               /* 最多占可用宽度的60% */
  padding: 10px 14px;
  border-radius: 18px;
  white-space: pre-wrap;        /* 保持换行 */
  word-break: break-word;       /* 长词自动换行 */
  line-height: 1.5;
}

/* 用户气泡样式 */
.message-item.user .bubble {
  background-color:#374151;    /* 蓝色 */
  color: #ffffff;
  border-bottom-right-radius: 4px;
}

/* AI 气泡样式 */
.message-item.assistant .bubble {
  background-color: #374165;    /* 深灰 */
  color: #e5e7eb;
  border-bottom-left-radius: 4px;
}
</style>
