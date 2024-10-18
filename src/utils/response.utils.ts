import { ServerResponse } from 'node:http'

export const sendSuccessResponse = <T>(res: ServerResponse, statusCode: number = 200, data?: T) => {
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
  statusCode: number = 500,
  message: string = 'Internal Server Error',
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
