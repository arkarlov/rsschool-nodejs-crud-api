import { ServerResponse } from 'node:http'

export const sendSuccessResponse = <T>(res: ServerResponse, data: T, statusCode: number = 200) => {
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
  message: string,
  statusCode: number = 400,
  cause?: string
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
