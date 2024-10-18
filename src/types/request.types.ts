import { IncomingMessage, ServerResponse } from 'node:http'

export enum RequestMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type RequestController<T extends any[] = []> = (
  req: IncomingMessage,
  res: ServerResponse,
  ...args: T
) => Promise<void>
