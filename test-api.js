import { config } from 'dotenv'
import { createServer } from 'http'
import handler from './api/chat.js'

config()

const server = createServer(async (req, res) => {
  if (req.url?.startsWith('/api/')) {
    let body = ''
    req.on('data', chunk => { body += chunk })
    req.on('end', async () => {
      req.body = body ? JSON.parse(body) : {}
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
      if (req.method === 'OPTIONS') {
        res.writeHead(204)
        res.end()
        return
      }
      try {
        await handler(req, res)
      } catch (err) {
        res.writeHead(500)
        res.end(JSON.stringify({ error: 'Internal server error' }))
      }
    })
  } else {
    res.writeHead(404)
    res.end('Not found')
  }
})

const PORT = 3001
server.listen(PORT, () => {
  console.log(`\n🔧 API Server running at http://localhost:${PORT}`)
  console.log(`   POST http://localhost:${PORT}/api/chat\n`)
})
