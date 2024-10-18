import { type RequestListener } from 'node:http'
import { ApiRoutes } from '../types/route.types'
import { userRouter } from './user.router'
import { sendErrorResponse } from '../utils/response.utils'
import { StatusCode } from '../types/status-code'

export const router: RequestListener = (req, res) => {
  const { url } = req

  if (url.startsWith(ApiRoutes.USERS)) {
    userRouter(req, res)
    return
  }

  sendErrorResponse(res, StatusCode.NOT_FOUND, `Resource ${JSON.stringify(url)} not found`)
}
