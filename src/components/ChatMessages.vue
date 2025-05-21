<template>
  <div class="chat-messages">
    <ChatMessageItem
      v-for="(m,i) in messages"
      :key="i"
      :message="m"
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import ChatMessageItem from './ChatMessageItem.vue'

const props = defineProps({
  messages: { type: Array, required: true }
})
</script>

<style scoped>
.chat-messages {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;            /* 气泡之间的间距 */
  padding: 16px;
  overflow-y: auto;    /* 仅纵向滚动 */
  overflow-x: hidden;  /* 禁止横向滚动 */
}
</style>
