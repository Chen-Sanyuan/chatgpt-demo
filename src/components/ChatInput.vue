<!-- src/components/ChatInput.vue -->
<template>
  <form @submit.prevent="onSubmit" class="chat-input-form">
    <div class="textarea-wrapper">
      <textarea
        ref="textarea"
        v-model="text"
        class="chat-input-textarea"
        rows="1"
        placeholder="输入消息，按 Enter 发送，Shift+Enter 换行..."
        @input="adjustHeight"
        @keydown="handleKeydown"
      ></textarea>
      <!-- <input ref="fileInput" type="file" accept="*/*" hidden @change="onFileChange"/>
      <el-button icon="Plus" @click="triggerFileSelect" class="upload-btn" circle/> -->
      <el-button type="submit" icon="Upload" class="send-btn" @click="onSubmit" circle/>
    </div>
    
  </form>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

const emit = defineEmits(['send'])
const text = ref('')
const textarea = ref(null)

// 与 CSS line-height 保持一致：1.5rem ≈ 24px
const LINE_HEIGHT = 24
const MAX_LINES   = 4
const MAX_HEIGHT  = LINE_HEIGHT * MAX_LINES


function onSubmit() {
  console.log('[ChatInput] onSubmit 文本：', text.value)
  if (!text.value.trim()) return
  emit('send', text.value.trim())
  text.value = ''
  nextTick(adjustHeight)
}

function handleKeydown(e) {
  // Enter 送出、Shift+Enter 插入换行
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    onSubmit()
  }
}

// 动态调整高度和滚动条
function adjustHeight() {
  const el = textarea.value
  if (!el) return

  // 重置高度以重新计算 scrollHeight
  el.style.height = 'auto'

  // 如果内容高度超过最大，启用滚动并限定高度
  if (el.scrollHeight > MAX_HEIGHT) {
    el.style.height       = MAX_HEIGHT + 'px'
    el.style.overflowY    = 'auto'
  } else {
    // 内容在 4 行以内时，不显示滚动条，自动撑高
    el.style.height       = el.scrollHeight + 'px'
    el.style.overflowY    = 'hidden'
  }
}


onMounted(() => {
  // 初始化时也调整高度
  nextTick(adjustHeight)
})
</script>

<style scoped>
.chat-input-form {
  padding: 16px;
}


.textarea-wrapper {
  position: relative;
  display: block;        /* 让 wrapper 占满横向 */
}


.chat-input-textarea {
  width: 100%;
  box-sizing: border-box;

  border: 1px solid #4a5568;
  border-radius: 10px;

  /* 四周填充：上 8px，右 48px，下 48px，左 48px */
  padding: 8px 48px 48px 48px;

  font-size: 14px;
  line-height: 1.5rem;       /* ≈24px */

  resize: none;
  background-color: #2d3748;
  color: #f9fafb;
  overflow-y: hidden;
}


.send-btn {
  position: absolute;
  bottom: 8px;
  right: 8px;
  z-index: 10;
}

.send-btn {
  background-color: #2d3748;
  color: #f9fafb;
  border: 1px solid #f9fafb;
}

.send-btn:hover {
  background-color: #2d3760;
}

.send-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

