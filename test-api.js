import { config } from 'dotenv'
import { createServer } from 'http'
import chatHandler from './api/chat.js'
import contactHandler from './api/contact.js'

config()

const routes = {
  '/api/chat': chatHandler,
  '/api/contact': contactHandler,
}

function attachVercelResponseHelpers(res) {
  res.status = (statusCode) => {
    res.statusCode = statusCode
    return res
  }

  res.json = (payload) => {
    if (!res.headersSent) {
      res.setHeader('Content-Type', 'application/json')
    }
    res.end(JSON.stringify(payload))
  }
}

const server = createServer(async (req, res) => {
  if (!req.url?.startsWith('/api/')) {
    res.writeHead(404)
    res.end('Not found')
    return
  }

  const routePath = req.url.split('?')[0]
  const handler = routes[routePath]

  if (!handler) {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'API route not found' }))
    return
  }

  let body = ''
  req.on('data', chunk => { body += chunk })
  req.on('end', async () => {
    attachVercelResponseHelpers(res)

    try {
      req.body = body ? JSON.parse(body) : {}
    } catch {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Invalid JSON payload' }))
      return
    }

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
    } catch (error) {
      console.error('Local API error:', error)
      res.writeHead(500)
      res.end(JSON.stringify({ error: 'Internal server error' }))
    }
  })
})

const PORT = 3001
server.listen(PORT, () => {
  console.log(`\nAPI Server running at http://localhost:${PORT}`)
  console.log(`   POST http://localhost:${PORT}/api/chat`)
  console.log(`   POST http://localhost:${PORT}/api/contact\n`)
})
