import { type RequestListener } from 'node:http'
import { ApiRoutes } from '../types/route.types'
import { userRouter } from './user.router'

export const router: RequestListener = (req, res) => {
  const { url } = req

  if (url.startsWith(ApiRoutes.USERS)) {
    userRouter(req, res)
    return
  }

  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ message: 'Not Found' }))
}
