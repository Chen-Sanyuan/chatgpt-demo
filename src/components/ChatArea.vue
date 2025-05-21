<!-- src/components/ChatArea.vue -->
<template>
  <div class="chat-area">
    <!-- 横跨整屏的 Header -->
    <ChatHeader />

    <!-- 限制宽度并居中的正文内容 -->
    <div class="chat-body">
      <!-- 消息列表区 -->
      <div ref="messagesContainer" class="chat-content">
        <ChatMessages :messages="messages" />
      </div>
      <!-- 底部输入区 -->
      <div class="chat-input-wrapper">
        <ChatInput :disabled="loading" @send="handleSend" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import ChatHeader from './ChatHeader.vue'
import ChatMessages from './ChatMessages.vue'
import ChatInput from './ChatInput.vue'

// 接收父组件传入的 sessionId
const props = defineProps({
  sessionId: { type: String, required: true }
})

const messages = ref([])
const loading = ref(false)
const messagesContainer = ref(null)



// 会话切换时清空历史
watch(() => props.sessionId, () => {
  messages.value = []
})


async function handleSend(content) {

  // 1. 先把用户消息渲染到界面
  messages.value.push({ role: 'user', content })
  scrollToBottom()

  // 2. 插入一个空的 assistant 占位
  messages.value.push({ role: 'assistant', content: '' })
  const idx = messages.value.length - 1

  loading.value = true
  try {
    // 3. 发起流式请求
    const res = await fetch('/api/chat', {
      method: 'POST', 
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ message: content })
    })
    // 4. 拿到可读流的 reader
    const reader = res.body.getReader()
    const decoder = new TextDecoder()

    let buffer = ''
    // 5. 持续读取并解析 SSE 格式
    while (true) {
      const { value, done } = await reader.read()
      if (done) break

      // 解码本次字节块
      buffer += decoder.decode(value, { stream: true })
      console.log("buffer", buffer)
      // 按 SSE 事件分段（以 "\n\n" 分隔）
      const parts = buffer.split('\n\n')
      // 最后一段可能不完整，保留到下一轮
      buffer = parts.pop()

      for (const part of parts) {
        // 每段以 "data: ..." 开头
        if (!part.startsWith('data:')) continue
        const data = part.replace(/^data:\s*/, '')
        if (data === '[DONE]') {
          doneStreaming()
          return
        }
        // JSON 字符串即增量文本
        const delta = JSON.parse(data)
        console.log("delta", delta)
        // 累加并更新占位消息
        messages.value[idx].content += delta
        await nextTick(scrollToBottom)
      }
    }
    doneStreaming()
  } catch (e) {
    messages.value[idx].content = '请求失败，请稍后重试。'
  } finally {
    loading.value = false
  }
}

function doneStreaming() {
  loading.value = false
  scrollToBottom()
}



// 滚动到底部
function scrollToBottom() {
  nextTick(() => {
    const el = messagesContainer.value
    if (el) el.scrollTop = el.scrollHeight
  })
}
</script>

<style scoped>
/* 最外层，竖直布局并铺满父容器 */
.chat-area {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #1f2937;
  overflow: hidden; 
}

/* 正文容器：限宽居中 */
.chat-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  overflow: hidden; 
}

/* 消息列表：占满中间剩余空间，可滚动 */
.chat-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

/* 输入区容器：限宽居中，并分割线 */
.chat-input-wrapper {
  padding: 16px;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
}
</style>
