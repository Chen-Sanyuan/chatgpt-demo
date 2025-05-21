// server/index.js
import express from 'express'
import dotenv from 'dotenv'
import { OpenAI } from 'openai'



dotenv.config()

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

// 会话历史
const messages = [
  { role: 'system', content: '你是一个友好的助手。' }
]

const openai = new OpenAI({
  apiKey: process.env.DASHSCOPE_API_KEY,
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1'
})

app.post('/api/chat', async (req, res) => {
  const { message } = req.body
  if (!message) return res.status(400).json({ error: 'Missing message' })

  messages.push({ role: 'user', content: message })

  // 告诉客户端：这是一个 SSE 长连接
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  })

  try {
    const stream = await openai.chat.completions.create({
      model: 'qwen-plus',
      messages,
      stream: true    // ← 这里打开流式
    })
    let full = ''
    for await (const part of stream) {
      const delta = part.choices[0].delta?.content
      if (!delta) continue
      full += delta
      // 每次增量都发给前端
      res.write(`data: ${JSON.stringify(delta)}\n\n`)
    }

    // 流完了
    res.write(`data: [DONE]\n\n`)
    res.end()

    messages.push({ role: 'assistant', content: full })
  } catch (e) {
    console.error(e)
    res.write(`event: error\ndata: ${JSON.stringify(e.message)}\n\n`)
    res.end()
  }
})

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`))
