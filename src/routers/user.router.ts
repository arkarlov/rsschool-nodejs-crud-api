import { type RequestListener } from 'node:http'
import userController from '../controllers/user.controller'
import { ApiRoutes } from '../types/route.types'
import { isValidUserId } from '../utils/user.utils'

export const userRouter: RequestListener = (req, res) => {
  const { method, url } = req

  if (method === 'GET') {
    if (url === ApiRoutes.USERS) {
      void userController.getAllUsers(req, res)
      return
    }

    const userId = req.url.split('/').pop()

    if (!isValidUserId(userId)) {
      const response = { data: null, error: 'Bad request' }

      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(response))
      return
    }

    void userController.getUser(req, res, userId)

    return
  }

  if (method === 'POST') {
    if (url === ApiRoutes.USERS) {
      void userController.createUser(req, res)
      return
    }

    return
  }

  if (method === 'PUT') {
    const userId = req.url.split('/').pop()

    if (!isValidUserId(userId)) {
      const response = { data: null, error: 'Bad request' }

      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(response))
      return
    }

    void userController.updateUser(req, res, userId)

    return
  }

  if (method === 'DELETE') {
    const userId = req.url.split('/').pop()

    if (!isValidUserId(userId)) {
      const response = { data: null, error: 'Bad request' }

      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(response))
      return
    }

    void userController.deleteUser(req, res, userId)

    return
  }

  res.writeHead(400, { 'Content-Type': 'text/plain' })
  res.end('Bad Request')
}
