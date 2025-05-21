<!-- src/components/Sidebar.vue -->
<template>
  <aside class="sidebar-content">

    <div
      v-for="(items, grp) in groupedSessions"
      :key="grp"
      class="session-group"
    >
      <div class="group-title">{{ grp }}</div>
      <ul class="session-list">
        <li
          v-for="s in items"
          :key="s.id"
          @click="$emit('select-session', s.id)"
        >
          <div
            :class="[
              'session-item',
              { selected: s.id === currentSessionId }
            ]"
          >
            {{ s.title }}
          </div>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'

// 直接从 defineProps 解构出两个变量
const { sessions, currentSessionId } = defineProps({
  sessions:          { type: Array,  required: true },
  currentSessionId:  { type: String, required: true },
})

function getGroupLabel(iso) {
  const now = new Date()
  const d   = new Date(iso)
  const delta = now.setHours(0,0,0,0) - d.setHours(0,0,0,0)
  const days  = Math.floor(delta / 86400000)
  if (days === 0) return '今天'
  if (days === 1) return '昨天'
  if (days < 7) return '前 7 天'
  return '更早'
}

// 用解构后的 sessions 而不是 props.sessions
const groupedSessions = computed(() => {
  const map = {}
  sessions.forEach(s => {
    const grp = getGroupLabel(s.createdAt)
    ;(map[grp] || (map[grp] = [])).push(s)
  })
  // 保持固定顺序
  return ['今天','昨天','前 7 天','更早']
    .filter(k => map[k])
    .reduce((o, k) => ((o[k] = map[k]), o), {})
})
</script>

<style scoped>
  .sidebar-content {
    color: white;
    padding: 16px;
    box-sizing: border-box;
  }


  /* 每个分组之间的间隔 */
  .session-group + .session-group {
    margin-top: 32px;
  }

  /* 分组标题 */
  .group-title {
    font-size: 14px;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  /* 会话列表容器，去掉默认的 ul/padding */
  .session-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  /* 单条会话项 */
  .session-item {
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 16px;
    color: #e5e7eb;
    margin-bottom: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  /* hover 效果 */
  .session-item:hover {
    background-color: #374151;
  }

  /* 当前选中高亮 */
  .session-item.selected {
    background-color: #4b5563;
    color: #ffffff;
  }
</style>

