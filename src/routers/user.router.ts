import { type RequestListener } from 'node:http'
import userController from '../controllers/user.controller'
import { ApiRoutes } from '../types/route.types'

export const userRouter: RequestListener = (req, res) => {
  const { method, url } = req

  if (method === 'GET') {
    if (url === ApiRoutes.USERS) {
      void userController.getAllUsers(req, res)
    } else {
      void userController.getUser(req, res)
    }
    return
  }

  res.writeHead(400, { 'Content-Type': 'text/plain' })
  res.end('Bad Request')
}
