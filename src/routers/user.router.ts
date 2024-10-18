import { type RequestListener } from 'node:http'
import userController from '../controllers/user.controller'
import { ApiRoutes } from '../types/route.types'
import { getUserId } from '../utils/user.utils'
import { ResponseCode } from '../types/response.types'
import { RequestMethods } from '../types/request.types'
import { handleErrorResponse } from '../utils/response.utils'
import { AppError } from '../types/error.types'

export const userRouter: RequestListener = (req, res) => {
  const { method, url } = req
  try {
    if (method === RequestMethods.GET) {
      if (url === ApiRoutes.USERS) {
        return void userController.getAllUsers(req, res)
      }

      const userId = getUserId(url)
      return void userController.getUser(req, res, userId)
    }

    if (method === RequestMethods.POST) {
      if (url === ApiRoutes.USERS) {
        return void userController.createUser(req, res)
      }

      throw new AppError(ResponseCode.BAD_REQUEST, `Invalid url: ${JSON.stringify(url)}`)
    }

    if (method === RequestMethods.PUT) {
      if (url === ApiRoutes.USERS) {
        throw new AppError(ResponseCode.BAD_REQUEST, `Invalid url: ${JSON.stringify(url)}`)
      }

      const userId = getUserId(url)
      return void userController.updateUser(req, res, userId)
    }

    if (method === RequestMethods.DELETE) {
      if (url === ApiRoutes.USERS) {
        throw new AppError(ResponseCode.BAD_REQUEST, `Invalid url: ${JSON.stringify(url)}`)
      }

      const userId = getUserId(url)
      return void userController.deleteUser(req, res, userId)
    }
  } catch (error) {
    handleErrorResponse(res, error)
  }
}
