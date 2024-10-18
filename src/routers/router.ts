import { type RequestListener } from 'node:http'
import { ApiRoutes } from '../types/route.types'
import { userRouter } from './user.router'
import { sendErrorResponse } from '../utils/response.utils'
import { ResponseCode } from '../types/response.types'
import { RequestMethods } from '../types/request.types'

export const router: RequestListener = (req, res) => {
  const { method, url } = req

  if (!(method in RequestMethods)) {
    sendErrorResponse(res, ResponseCode.BAD_REQUEST, `${method} method is not allowed`)
    return
  }

  if (url.startsWith(ApiRoutes.USERS)) {
    userRouter(req, res)
    return
  }

  sendErrorResponse(res, ResponseCode.NOT_FOUND, `Resource ${JSON.stringify(url)} is not found`)
}
