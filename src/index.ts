import http from 'node:http'
import dotenv from 'dotenv'

import { router } from './routers/router'

dotenv.config()

const PORT = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  // res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  router(req, res)
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
