import { ServerResponse } from 'node:http'
import { AppError } from '../types/error.types'
import { ResponseCode } from '../types/response.types'
import { serializeError } from './error.utils'

export const sendSuccessResponse = <T>(res: ServerResponse, statusCode: number, data?: T) => {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(
    JSON.stringify({
      status: 'success',
      data,
    })
  )
}

export const sendErrorResponse = (
  res: ServerResponse,
  statusCode: number,
  message: string,
  cause?: unknown
) => {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(
    JSON.stringify({
      status: 'error',
      error: {
        message,
        cause,
      },
    })
  )
}

export const handleErrorResponse = (res: ServerResponse, err: unknown) => {
  if (err instanceof AppError) {
    sendErrorResponse(res, err.statusCode, err.message)
    return
  }

  sendErrorResponse(
    res,
    ResponseCode.INTERNAL_SERVER_ERROR,
    'Internal Server Error',
    serializeError(err)
  )
}
