import { ServerResponse } from 'node:http'
import { AppError } from '../types/error.types'
import { sendErrorResponse } from '../utils/response.utils'
import { StatusCode } from '../types/status-code'

export const handleError = (err: unknown, res: ServerResponse) => {
  if (err instanceof AppError) {
    sendErrorResponse(res, err.statusCode, err.message)
    return
  }

  sendErrorResponse(
    res,
    StatusCode.INTERNAL_SERVER_ERROR,
    'Internal Server Error',
    serializeError(err)
  )
}

export const serializeError = (error: unknown) =>
  error instanceof Error
    ? {
        message: error.message,
        stack: error.stack,
        name: error.name,
      }
    : error
